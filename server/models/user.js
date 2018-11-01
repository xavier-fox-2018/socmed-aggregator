const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/hacktivgit', {useNewUrlParser:true});

const Schema = mongoose.Schema

const userSchema = new Schema ({
    email: {
        type: String,
        validate: {
            validator: function(value) {
                return /\w+@+\w+\.\w/.test(value)
            },
            message: "Please insert a valid mail"
        },
        required: true
    },
    name: {
        type: String,
        require: true
    }
})

const User = mongoose.model('Book', userSchema,'Users')

module.exports = User