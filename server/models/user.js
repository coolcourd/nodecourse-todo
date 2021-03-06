const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model("User", {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }

  },
  password: {
    type: String,
    required: true,
    trim: false,
    minlength: 8
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

module.exports = {User}
