const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  userId: Number,
  signIn: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User