require('dotenv').config()
const port = process.env.PORT || 5000
const restify = require('restify')
const mongoose = require('mongoose')
const server = restify.createServer()

server.use(restify.plugins.bodyParser())

server.pre(restify.plugins.pre.userAgentConnection())
server.pre(restify.plugins.pre.dedupeSlashes())

server.listen(port, () => {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
})

const db = mongoose.connection

db.on('error', err => console.log(err))

db.once('open', () => {
  require('./routes/posts')(server)
  require('./routes/users')(server)
  console.log('Listening on port: %s', port)
})
