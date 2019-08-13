const jwt = require('jsonwebtoken')

exports.getID = async (bearer) => {
  return new Promise(async (res, rej) => {
    try {
      const token = bearer.split(' ')[1]
      const id = await jwt.verify(token, process.env.APP_SECRET)
      res(id._id)
    } catch(err) {
      rej('db error')
    }
  })
}
