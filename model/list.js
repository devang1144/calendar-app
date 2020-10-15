const mongoose = require('mongoose');

const list = new mongoose.Schema({
    todo:String,
    month:String,
    day:String,
    year:String,
    date: {
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('events', list);