const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://navdishjaggi:Navdish2001@cluster0.m2bproi.mongodb.net/?retryWrites=true&w=majority")
    .then(console.log("DB connected"))
    .catch((error) => console.log(error));

module.exports = mongoose;