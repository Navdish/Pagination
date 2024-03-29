const mongoose = require('mongoose');

const User =  mongoose.Schema({
    name : String,
    email : String,
    password : String, 
    role : String,
    description : String,
    address : String
})

const Users = mongoose.model('userModel', User);

module.exports = Users;