const bcrypt = require('bcryptjs')
const errors = require('restify-errors')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bauth = require('../bauth')

module.exports = server => {
  //CRUD operations => post get put del
  server.post('/register', async (req, res, next) => {
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError('Data not sent correctly'))
    }

    const { userName,
            firstName,
            middleName,
            lastName,
            email,
            password,
            location,
            bio,
            avatar } = req.body

    const user = new User({
      userName,
      firstName,
      middleName,
      lastName,
      email,
      password,
      location,
      bio,
      avatar
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        user.password = hash;

        try {
          const newUser = await user.save()
          res.send(201)
          next()
        } catch(err) {
          return next(new errors.InternalError(err.message))
        }
      })
    })
  })

  server.post('/login', async (req, res, next) => {
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

  server.get('/users', async (req, res, next) => {
    try {
      console.log(req.headers.authorization)
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
