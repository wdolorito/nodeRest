require('dotenv').config()
const port = process.env.PORT || 5000
const restify = require('restify')
const server = restify.createServer()

/*console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)*/

function respond(req, res, next) {
  res.send('hello ' + req.params.name)
  next()
}

server.use(restify.plugins.bodyParser())

server.pre(restify.plugins.pre.userAgentConnection())
server.pre(restify.plugins.pre.dedupeSlashes())

require('./routes/posts')(server)
require('./routes/users')(server)

server.listen(port, function() {
  console.log('Listening on port: %s', port)
})
