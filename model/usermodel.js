const mongoose = require('mongoose');

const event = new mongoose.Schema({
    eventName:String,
    eventDate:String,
    eventTime:String,
    moment:String
})

const account = new mongoose.Schema({
    kind:String,
    uid:String,
    password:String
});

const userSchema = new mongoose.Schema({
    email: { type:String, required:true, max:255, min:6 },
    events: [ event ],
    accounts:[ account ],
    date: { type:Date, default:Date.now },
    resetpass: String
})

module.exports = mongoose.model('User', userSchema);