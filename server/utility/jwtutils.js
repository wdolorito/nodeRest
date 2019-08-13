const jwt = require('jsonwebtoken')

exports.getID = async (bearer) => {
  const token = bearer.split(' ')[1]
  const id = await jwt.verify(token, process.env.APP_SECRET)
  return id._id
}
