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
