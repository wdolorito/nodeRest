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
    let sent, towork, isSame = (sid === did)
    try {
      sent = await whoAmI(sid)
      towork = await whoAmI(did)
    } catch(err) {
      rej('db error')
    }

    switch(act) {
      case 'delete':
        res(canDelete(sent, towork, type, isSame))
        break
      case 'update':
        res(canUpdate(sent, towork, type, isSame))
        break
      default:
        rej('db error')
    }

  })
}

function whoAmI(id) {
  return new Promise(async (res, rej) => {
    try {
      let admin = await exports.isAdmin(id)
      if(admin) res('admin')
      if(!admin) {
        if(await exports.isMaster(id)) res('master')
      }
      res('user')
    } catch(err) {
      rej('db error')
    }
  })
}

function canDelete(sent, todel, type, isSame) {
  switch(type) {
    case 'user':
      if(sent === 'master' & sent !== todel) return true
      if(sent === 'admin')
      break
    case 'post':
      break
    default:
      return false
  }
}

function canUpdate(sent, toup, type, isSame) {
  switch(type) {
    case 'user':
      break
    case 'post':
      break
    default:
      return false
  }
}
