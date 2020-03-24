const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type:String},
    password: {type:String},
    latitude: {type:Number},
    longtitude:{type:Number}
});

const User = mongoose.model('User', userSchema);

module.exports = User;