const errors = require('restify-errors')
const User = require('../models/User')

module.exports = server => {
  //CRUD operations => post get put del
  server.post('/user', async (req, res, next) => {
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

    try {
      const newUser = await user.save()
      res.send(201)
      next()
    } catch(err) {
      console.log(err)
      return next(new errors.InternalError(err.message))
    }
  })

  server.get('/users', async (req, res, next) => {
    try {
      const users = await User.find()
      res.send(users)
      next()
    } catch(err) {
      return next(new errors.InvalidContentError(err))
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

  // server.put('/user/:id', async (req, res, next) => { // 200 req
  //   try {
  //     res.send(new errors.InvalidArgumentError('update a user'))
  //     next()
  //   } catch(err) {
  //     return next(new errors.InvalidArgumentError(err)) // || MissingParameterError()
  //   }
  // })
  //
  // server.del('/user/:id', async (req, res, next) => { // 204 req
  //   try {
  //     res.send(new errors.GoneError('delete a user'))
  //     next()
  //   } catch(err) {
  //     return next(new errors.GoneError(err))
  //   }
  // })
}
