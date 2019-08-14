const bcrypt = require('bcryptjs')
const errors = require('restify-errors')
const jwt = require('jsonwebtoken')
const Blacklist = require('../models/Blacklist')
const User = require('../models/User')
const UserData = require('../models/UserData')
const bauth = require('../utility/bauth')
const utils = require('../utility/jwtutils')

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

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        user.password = hash;

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
          return next(new errors.InternalError('db error'))
        }
      })
    })
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
      console.log(pToken)
      res.send(200)
    } catch(err) {
      return next(new errors.InternalError('db error'))
    }
  })

  server.get('/users', async (req, res, next) => {
    try {
      const resToken = req.headers.authorization
      const pToken = resToken.split(' ')
      console.log(jwt.verify(pToken[1], process.env.APP_SECRET))

      const users = await User.find()
      res.send(users)
      next()
    } catch(err) {
      return next(new errors.InvalidContentError(err.message))
    }
  })

  server.get('/users/:id', async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id)
      res.send(user)
      next()
    } catch(err) {
      return next(new errors.ResourceNotFoundError('No user with id: ' + req.params.id))
    }
  })

  server.put('/user/:id', async (req, res, next) => { // 200 req
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError('Data not sent correctly'))
    }

    try {
      const user = await User.findById(req.params.id)
      await User.updateOne({ _id: user._id}, { $set: req.body })
      res.send(200)
      next()
    } catch(err) {
      return next(new errors.ResourceNotFoundError('No user with id: ' + req.params.id))
    }
  })

  server.del('/user/:id', async (req, res, next) => { // 204 req
    try {
      const user = await User.findById(req.params.id)
      await User.deleteOne({ _id: user._id})
      res.send(204)
      next()
    } catch(err) {
      return next(new errors.ResourceNotFoundError('No user with id: ' + req.params.id))
    }
  })
}
