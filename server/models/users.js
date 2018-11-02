const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserSchema = new Schema({
    email: String,
    name: String
})

var User = mongoose.model('User', UserSchema)

module.exports = User