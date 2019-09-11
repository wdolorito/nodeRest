import React, { Component } from 'react'
import PostItem from './PostItem'

class Posts extends Component {
  render() {
    return this.props.posts.map((post) => (
      <PostItem post={post} />
    ))
  }
}

export default Posts
