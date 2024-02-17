const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username should be unique"],
    minlength: [3, "Username is too short"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email should be unique"],
    minlength: [10, "Email is too short"],
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: "Email must be valid",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [4, "Password is too short"],
  },
});

const User = mongoose.model('User', userSchema)

module.exports = User