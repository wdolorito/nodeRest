const errors = require('restify-errors')

module.exports = server => {
  //CRUD operations => post get put del
  server.post('/post', async (req, res, next) => {
    try {
      res.send(new errors.BadRequestError('create a post')) // 201 req
      next()
    } catch(err) {
      return next(new errors.BadRequestError(err))
    }
  })

  server.get('/posts', async (req, res, next) => {
    try {
      res.send(new errors.InvalidContentError('get all posts'))
      next()
    } catch(err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  server.get('/posts/:id', async (req, res, next) => {
    try {
      res.send(new errors.InvalidContentError('get one post'))
      next()
    } catch(err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  server.put('/post/:id', async (req, res, next) => { // 200 req
    try {
      res.send(new errors.InvalidArgumentError('update a post'))
      next()
    } catch(err) {
      return next(new errors.InvalidArgumentError(err)) // || MissingParameterError()
    }
  })

  server.del('/post/:id', async (req, res, next) => { // 204 req
    try {
      res.send(new errors.GoneError('delete a post'))
      next()
    } catch(err) {
      return next(new errors.GoneError(err))
    }
  })
}
