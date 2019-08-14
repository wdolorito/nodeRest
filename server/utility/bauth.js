const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.bauth = (email, password) => {
  return new Promise(async (res, rej) => {
    try {
      const user = await User.findOne({ email }).select('password')

      bcrypt.compare(password, user.password, async (err, isMatch) => {
        if(err) throw err
        if(!isMatch) rej('Authentication error')
        const toSend = await User.findOne({ email })
        res(toSend)
      })
    } catch(err) {
      rej('Authentication error')
    }
  })
}

exports.isAdmin = (id) => {
  return new Promise(async (res, rej) => {
    try {
      const user = await User.findOne({ _id: id }).select('isAdmin')
      res(user.isAdmin)
    } catch(err) {
      rej('db error')
    }
  })
}

exports.isMaster = (id) => {
  return new Promise(async (res, rej) => {
    try {
      const user = await User.findOne({ _id: id }).select('isMaster')
      res(user.isMaster)
    } catch(err) {
      rej('db error')
    }
  })
}

exports.canDelete = (sid, did) => {
  return new Promise(async (res, rej) => {
    const smaster = await exports.isMaster(sid)
    const sadmin = await exports.isAdmin(sid)
    const dmaster = await exports.isMaster(sid)
    const dadmin = await exports.isAdmin(sid)
    res('true')
  })
}
