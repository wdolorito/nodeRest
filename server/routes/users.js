const bcrypt = require('bcryptjs')
const errors = require('restify-errors')
const jwt = require('jsonwebtoken')
const Blacklist = require('../models/Blacklist')
const User = require('../models/User')
const UserData = require('../models/UserData')
const bauth = require('../utility/bauth')
const utils = require('../utility/jwtutils')

const getUser = (id) => {
  return new Promise(async (res, rej) => {
    try {
      const user = await User.findById(id).select('-__v')
      const userdata = await UserData.findOne({ owner: user._id }).select('-_id -__v')
      const payload = []
      payload.push(user)
      if(userdata != null) payload.push(userdata)
      res(payload)
    } catch(err) {
      rej(err)
    }
  })
}

const getUsers = (arr) => {
  return new Promise(async (res, rej) => {
    try {
      let payload = []
      for(let count = 0; count < arr.length; count++) {
        payload.push(await getUser(arr[count]._id))
      }
      res(payload)
    } catch(err) {
      rej(err)
    }
  })
}

const hashPass = (plain) => {
  return new Promise((res, rej) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(plain, salt, (err, hash) => {
        if(hash) {
          res(hash)
        } else {
          rej('error')
        }
      })
    })
  })
}

module.exports = server => {
  Blacklist.init()
  User.init()

  //CRUD operations => post get put del
  server.post('/register', async (req, res, next) => {
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError('Data not sent correctly'))
    }

    const { handle,
            firstName,
            middleName,
            lastName,
            email,
            password,
            location,
            bio,
            avatar } = req.body

    const user = new User({
      email,
      password
    })

    user.password = await hashPass(user.password)

    let newUser, userData

    try {
      newUser = await user.save()
    } catch(err) {
      return next(new errors.InternalError('db error'))
    }

    try {
      userData = new UserData({
        owner: newUser._id,
        handle,
        firstName,
        middleName,
        lastName,
        location,
        bio,
        avatar
      })
      const newUserData = await userData.save()
      res.send(201)
      next()
    } catch(err) {
      await User.deleteOne({ _id: user._id})
      return next(new errors.InternalError('db error'))
    }
  })

  server.post('/login', async (req, res, next) => {
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError('Data not sent correctly'))
    }

    const { email, password } = req.body

    try {
      const user = await bauth.bauth(email, password)
      const token = jwt.sign(user.toJSON(), process.env.APP_SECRET, { expiresIn: '30m' })
      const { iat, exp } = jwt.decode(token)
      res.send({ iat, exp, token })
    } catch(err) {
      return next(new errors.UnauthorizedError(err))
    }
  })

  server.post('/logout', async (req, res, next) => {
    try {
      const resToken = req.headers.authorization
      const pToken = resToken.split(' ')[1]
      const newBlacklist = new Blacklist({ token: pToken })
      const blacklist = await newBlacklist.save()
      res.send(200)
    } catch(err) {
      return next(new errors.InternalError('db error'))
    }
  })

  server.get('/users', async (req, res, next) => {
    const resToken = req.headers.authorization
    try {
      if(await utils.isExpired(resToken)) {
        return next(new errors.InvalidCredentialsError('No authorization token was found'))
      }
    } catch(err) {
      return next(new errors.InternalError('db error'))
    }

    try {
      const decoded = await utils.getID(resToken)

      let tuser
      try {
        tuser = await bauth.whoAmI(decoded)
      } catch(err) {
        return next(new errors.InternalServerError(err))
      }

      let users
      switch(tuser) {
        case 'user':
          users = await User.find().where('isMaster').ne(true).where('isAdmin').ne(true).select('-__v')
          break
        case 'admin':
          users = await User.find().where('isMaster').ne(true).select('-__v')
          break
        default:
          users = await User.find().select('-__v')
      }

      res.send(await getUsers(users))
      next()
    } catch(err) {
      return next(new errors.InvalidContentError(err.message))
    }
  })

  server.get('/user/:id', async (req, res, next) => {
    const resToken = req.headers.authorization
    try {
      if(await utils.isExpired(resToken)) {
        return next(new errors.UnauthorizedError('Not authorized'))
      }
    } catch(err) {
      return next(new errors.InternalError('db error'))
    }

    try {
      res.send(await getUser(req.params.id))
      next()
    } catch(err) {
      return next(new errors.ResourceNotFoundError('User does not exist'))
    }
  })

  server.put('/user/:id', async (req, res, next) => { // 200 req
    const resToken = req.headers.authorization
    try {
      if(await utils.isExpired(resToken)) {
        return next(new errors.UnauthorizedError('Not authorized'))
      }
    } catch(err) {
      return next(new errors.InternalError('db error'))
    }

    let canaction
    const user = await utils.getID(resToken)
    const towork = req.params.id

    try {
      canaction = await bauth.canAction(user, towork, 'update', 'user')
    } catch(err) {
      return next(new errors.InternalError('db error'))
    }

    let pass, email
    if('password' in req.body) {
      pass = await hashPass(req.body.password)
      delete req.body['password']

      if(canaction) {
        try {
          await User.updateOne({ _id: towork }, { password: pass })
        } catch(err) {
          return next(new errors.InternalError('Unable to update'))
        }
      }
    }

    if('email' in req.body) {
      email = req.body.email
      delete req.body['email']

      if(canaction) {
        try {
          await User.updateOne({ _id: towork }, { email: email })
        } catch(err) {
          return next(new errors.InternalError('Unable to update'))
        }
      }
    }

    if(canaction && (Object.keys(req.body).length !== 0)) {
      try {
        await UserData.updateOne({ owner: towork }, { $set: req.body })
        res.send(200)
        next()
      } catch(err) {
        return next(new errors.ResourceNotFoundError('User does not exist'))
      }
    }

    return next(new errors.UnauthorizedError('Not authorized'))
  })

  server.del('/user/:id', async (req, res, next) => { // 204 req
    const resToken = req.headers.authorization
    try {
      if(await utils.isExpired(resToken)) {
        return next(new errors.UnauthorizedError('Not authorized'))
      }
    } catch(err) {
      return next(new errors.InternalError('db error'))
    }

    let canaction
    const user = await utils.getID(resToken)
    const towork = req.params.id

    try {
      canaction = await bauth.canAction(user, towork, 'delete', 'user')
    } catch(err) {
      return next(new errors.InternalError('db error'))
    }

    if(canaction) {
      try {
        const user = await User.findById(req.params.id)
        await User.deleteOne({ _id: user._id})
        await UserData.deleteOne({ owner: user._id})
        res.send(204)
        next()
      } catch(err) {
        return next(new errors.ResourceNotFoundError('User not found'))
      }
    }

    return next(new errors.UnauthorizedError('Not authorized'))
  })
}
