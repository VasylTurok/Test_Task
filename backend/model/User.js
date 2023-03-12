const {Schema,model, Schema: {Types:{ObjectId}}} = require('mongoose')

const User = new Schema ({
    userName: {type: String,  requires: true},
    email: {type: String, unique: true, requires: true},
    password: {type: String,  requires: true},
    phone: {type: Number, requires: true},
    events: [{type: ObjectId,  ref: 'Event'}],
    nextEventDate: {type: Date, default: Date.now()},
})

module.exports =model("User", User)