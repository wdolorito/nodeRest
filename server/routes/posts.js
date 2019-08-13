const errors = require('restify-errors')
const jwt = require('jsonwebtoken')
const Post = require('../models/Post')
const utils = require('../utility/jwtutils')

// owner, title, body

module.exports = server => {
  Post.init()

  // CRUD operations -> post get put del
  server.post('/post', async (req, res, next) => {
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError('Data not sent correctly'))
    }

    const { title, body } = req.body

    const sentToken = req.headers.authorization
    const decode = util.getId(sentToken)

    const post = new Post({
      owner: decode._id,
      title,
      body
    })

    try {
      const newPost = await post.save()
      res.send(201)
      next()
    } catch(err) {
      console.log(err)
      return next(new errors.InternalError('db error'))
    }
  })

  server.get('/posts', async (req, res, next) => {
    const sentToken = req.headers.authorization
    const decoded = await utils.getID(sentToken)
    console.log(decoded)
    try {
      const posts = await Post.find()
      res.send(posts)
      next()
    } catch(err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  server.get('/posts/byUser', async (req, res, next) => {
    try {
      const posts = await Post.find()
      res.send(posts)
      next()
    } catch(err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  server.get('/posts/byUser/:id', async (req, res, next) => {
    try {
      const posts = await Post.find()
      res.send(posts)
      next()
    } catch(err) {
      return next(new errors.InvalidContentError(err))
    }
  })

  server.get('/posts/:id', async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id)
      res.send(post)
      next()
    } catch(err) {
      return next(new errors.ResourceNotFoundError('No post with id: ' + req.params.id))
    }
  })

  server.put('/post/:id', async (req, res, next) => { // 200 req
    if(!req.is('application/json')) {
      return next(new errors.InvalidContentError('Data not sent correctly'))
    }

    try {
      const post = await Post.findById(req.params.id)
      await Post.updateOne({ _id: post._id}, { $set: req.body })
      res.send(200)
      next()
    } catch(err) {
      return next(new errors.ResourceNotFoundError('No post with id: ' + req.params.id))
    }
  })

  server.del('/post/:id', async (req, res, next) => { // 204 req
    try {
      const post = await Post.findById(req.params.id)
      await Post.deleteOne({ _id: post._id})
      res.send(204)
      next()
    } catch(err) {
      return next(new errors.ResourceNotFoundError('No post with id: ' + req.params.id))
    }
  })
}
