const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const UserSchema = new mongoose.Schema({
  isMaster: {
    type: Boolean,
    default: false,
    select: false,
    immutable: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    select: false,
    immutable: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    select: false,
    required: true
  }
})

UserSchema.plugin(timestamp)
UserSchema.set('collection', 'user')

const User = mongoose.model('User', UserSchema)
module.exports = User
