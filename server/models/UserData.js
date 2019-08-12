const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const UserDataSchema = new mongoose.Schema({
  owner: {
    type: String,
    select: false,
    required: true,
    trim: true
  },
  handle: {
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

UserDataSchema.plugin(timestamp)
UserDataSchema.set('collection', 'userdata')

const UserData = mongoose.model('UserData', UserDataSchema)
module.exports = UserData
