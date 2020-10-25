const mongoose = require('mongoose');

const contact = new mongoose.Schema({
    name:String,
    email:String,
    query:String
})

module.exports = mongoose.model('contact', contact);