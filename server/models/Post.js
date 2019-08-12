const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const PostSchema = new mongoose.Schema({
    owner: {
      type: String,
      required: true,
      select: false,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    body: {
      type: String,
      required: true,
      trim: true
    }
})

PostSchema.plugin(timestamp)

const Post = mongoose.model('Post', PostSchema)
module.exports = Post
