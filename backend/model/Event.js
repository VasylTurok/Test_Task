const {model,Schema}= require('mongoose')

const Event= new Schema({
    title:{type: String, required:true,},
    about:{type: String,required:true,},
    startDate:{type: Date,default: Date.now()+100000,},
    endDate:{type: Date,default: Date.now()+1000000,},
    
});

module.exports= model('Event', Event)
