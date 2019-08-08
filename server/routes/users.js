const errors = require('restify-errors')

module.exports = server => {
  //CRUD operations => post get put del
  server.post('/user', async (req, res, next) => {
    try {
      res.send(new errors.BadRequestError('create a user')) // 201 req
      next()
    } catch(err) {
      return next(new errors.BadRequestError(err))
    }
  })

  server.get('/users', async (req, res, next) => {
    try {
      res.send(new errors.InvalidContentError('get all users'))
      next()
    } catch(err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  server.get('/users/:id', async (req, res, next) => {
    try {
      res.send(new errors.InvalidContentError('get one user'))
      next()
    } catch(err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  server.put('/user/:id', async (req, res, next) => { // 200 req
    try {
      res.send(new errors.InvalidArgumentError('update a user'))
      next()
    } catch(err) {
      return next(new errors.InvalidArgumentError(err)) // || MissingParameterError()
    }
  })

  server.del('/user/:id', async (req, res, next) => { // 204 req
    try {
      res.send(new errors.GoneError('delete a user'))
      next()
    } catch(err) {
      return next(new errors.GoneError(err))
    }
  })
}
