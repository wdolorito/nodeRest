const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const UserSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true,
      trim: true
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    middleName: {
      type: String,
      required: false,
      trim: true
    },
    lastName: {
      type: String,
      required: false,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: false,
      trim: false
    },
    bio: {
      type: String,
      required: false,
      trim: false
    },
    avatar: {
      type: String,
      required: false,
      trim: true
    }
})

UserSchema.plugin(timestamp)

const User = mongoose.model('User', UserSchema)
module.exports = User
