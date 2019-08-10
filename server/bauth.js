const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.bauth = (email, password) => {
  return new Promise(async (res, rej) => {
    try {
      const user = await User.findOne({ email })

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err
        if(!isMatch) rej('Authentication error')
        res(user)
      })
    } catch(err) {
      rej('Authentication error')
    }
  })
}
