const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userModelSchema = new Schema({
    username: String,
    password: String,
    phone: Number
});

var userModel = mongoose.model('User', userModelSchema );

module.exports= userModel;