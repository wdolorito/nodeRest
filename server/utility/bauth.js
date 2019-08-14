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

exports.canAction = (sid, did, act, type) => {
  // sid = id from header
  // did = id sent in body
  // act = action, delete or update
  // type = type, user or post

  return new Promise(async (res, rej) => {
    switch(act) {
      case 'delete':
        break
      case 'update':
        break
      default:
        rej('db error')
    }

    }
    if(sid == did) res(true)

    try {
      const smaster = await exports.isMaster(sid)

      if(smaster) res(false)

      const sadmin = await exports.isAdmin(sid)
      const suser = !(smaster || sasmin)

      const dmaster = await exports.isMaster(sid)

      if(dmaster) res(false)

      const dadmin = await exports.isAdmin(sid)
      const duser = !(dmaster || dadmin)
    } catch(err) {
      rej('db error')
    }
  })
}
