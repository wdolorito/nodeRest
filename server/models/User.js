const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const UserSchema = new mongoose.Schema({
    isAdmin: {
      type: Boolean,
      default: false,
      select: false
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      select: false,
      required: true
    }
})

UserSchema.plugin(timestamp)

const User = mongoose.model('User', UserSchema)
module.exports = User
