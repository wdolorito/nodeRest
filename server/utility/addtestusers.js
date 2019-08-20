require('dotenv').config()
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('../models/User')
const UserData = require('../models/UserData')
const impusers = require('./testusers')

async function saveUser(user, userdata) {
  return new Promise( (res, rej) => {
    const { handle,
            firstName,
            middleName,
            lastName,
            location,
            bio,
            avatar } = userdata

    const { isMaster,
            isAdmin,
            email,
            password } = user

    const newuser = new User({
      isMaster,
      isAdmin,
      email,
      password
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        newuser.password = hash;

        try {
          console.log(await newuser.save())
        } catch(err) {
          console.log(err)
        }

        try {
          newData = new UserData({
            owner: newuser._id,
            handle,
            firstName,
            middleName,
            lastName,
            location,
            bio,
            avatar
          })
          console.log(await newData.save())
          res(true)
        } catch(err) {
          console.log(err)
          rej(false)
        }
      })
    })
  })
}

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true
})

async function doAdd() {
  let master = await saveUser(impusers.users.master, impusers.users.masterdata)
  let admin1 = await saveUser(impusers.users.admin1, impusers.users.admin1data)
  let admin2 = await saveUser(impusers.users.admin2, impusers.users.admin2data)
  let user1 = await saveUser(impusers.users.user1, impusers.users.user1data)
  let user2 = await saveUser(impusers.users.user2, impusers.users.user2data)
  if(user2) process.exit()
}

mongoose.connection.once('open', async () => {
  await doAdd()
})
