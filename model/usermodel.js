const mongoose = require('mongoose');

const event = new mongoose.Schema({
    eventname:String,
    eventDate:String,
    moment:String
})

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        min:6,
        max:255
    },
    email: {
        type:String,
        required:true,
        max:255,
        min:6
    },
    password: {
        type:String,
        required:true,
        max:1024,
        min:8
    },
    events: [
        event
    ],
    date: {
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User', userSchema);