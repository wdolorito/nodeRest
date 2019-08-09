const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

console.log(__dirname)

const PostSchema = new mongoose.Schema({
    authorId: {
      type: String,
      required: true,
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
