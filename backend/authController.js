const User = require('./model/User')
const Event = require('./model/Event')
const bcrypt = require('bcryptjs')
const {validationResult}=require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('./Config')


const generateAccessToken = (id)=>{
    const payload = {
        id
    }
    return jwt.sign(payload,secret,{expiresIn:"24h"})
}


class authController {
    async registration(req,res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json({massage:"this email is empty", errors})    
            }
            const {userName, email,password, phone }=req.body
            const candidate = await User.findOne({email})
            if(candidate){
                return res.status(400).json({massage:"this email is already taken"})
            }
            const hashPass=bcrypt.hashSync(password,4);
            const user = new User({userName,email, password: hashPass ,phone})
            await user.save()
            return res.json({massage:'registration OK'})
        } catch (e){
            console.log(e)
            res.status(400).json({massage: 'registration fail'})
        }

    }
    
    async login(req,res){
        try {
            const {userName,password}=req.body
            const user = await User.findOne({userName})
            if(!user){
                res.status(400).json({massage: 'user not found'})
            }
            const validPAss = bcrypt.compareSync(password,user.password)
            if(!validPAss){
                res.status(400).json({massage: 'wrong password'})
            }
            const token = generateAccessToken(user._id)
            return res.json({token})
        } catch (e){
            console.log(e)
            res.status(400).json({massage: 'login fail'})

        }
        
    }

    async getUsers(req,res){
        try {
            const users = await User.find()
            
            return res.json(users)
        } catch (e){
            console.log(e)
            res.status(400).json({massage: 'getUsers fail'})
        }
        
    }
    async addEvent(req,res){
        try {
            const {id}=req.params
            const {title, about,startDate,endDate}=req.body
            const user = await User.findById({"_id":id})
            const event = new Event({title,about,startDate,endDate})
            const eventsId = user.events
            const events=[]
            for (let index = 0; index < eventsId.length; index++) {
                events.push(await Event.findById(eventsId[index]))
                
            }
            events.push(event)
            let starts =[]
            events.forEach(el=> starts.push(el.startDate))
            starts.sort((a,b)=>{ return a-b} );
            for(const el of starts){
                if(Date.now()<el) {

                    if(user.nextEventDate>el&&user.nextEventDate>Date.now()){
                        user.nextEventDate=el;
                        break
                }}
            }
                    
            user.events.push(event)
            await event.save()
            await user.save()
            return res.json({massage:'addEvent OK'})
        } catch (e){
            console.log(e)
            res.status(400).json({massage: `${e}`})
        }
        
    }
    async getEvents(req,res){
        try {
            const {id}=req.params
            const user = await User.findById(id)
            const eventsId = await user.events
            const events=[]
            for (let index = 0; index < eventsId.length; index++) {
                events.push(await Event.findById(eventsId[index]))
                
            }
            // console.log(events)
            return res.json(events)
        } catch (e){
            console.log(e)
            res.status(400).json({massage: 'getEvents fail'})
        }
        
    }
    async getUser(req, res) {
        try {
            const {id}=req.params
            const user = await User.findById(id);
            return res.json(user);
        } catch (err){
            return res.status(400).json({massage: 'getUser fail'});
        }
    }
    async deleteUser(req,res) {
        try {
            const {id} =  req.params
            const user = await User.findByIdAndDelete(id)
            // await User.findByIdAndDelete(id);
            console.log(id)
            return res.json(user)
        } catch (err){
            console.log(err)
            res.status(400).json({massage: 'deleteUser fail'})
        }
    }
}

module.exports = new authController()