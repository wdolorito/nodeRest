require('dotenv').config()
const restify = require('restify')
const server = restify.createServer()

/*console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)*/

function respond(req, res, next) {
  res.send('hello ' + req.params.name)
  next()
}

server.pre(restify.plugins.pre.userAgentConnection())
server.pre(restify.plugins.pre.dedupeSlashes())

server.get('/hello/:name', respond)
server.head('/hello/:name', respond)

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url)
})
