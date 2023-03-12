const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')

router.post('/registration',[
    check('userName','Name cannot be empty').notEmpty(),
    check('email','Email cannot be empty').notEmpty(),
    check('password','The password must be a minimum of 4 and a maximum of 15 digits').isLength({min:4, max:15}),
    check('phone','Phone cannot be empty').notEmpty(),

], controller.registration)
router.post('/login',controller.login)
router.get('/users', controller.getUsers)
router.post('/addEvent/:id',controller.addEvent)
router.get('/getEvents/:id', controller.getEvents)
router.delete('/deleteUser/:id',controller.deleteUser)
router.get('/getUser/:id', controller.getUser)



module.exports = router