import React, { Component } from 'react'
import PostItem from './PostItem'

class Posts extends Component {
  render() {
    return this.props.posts.map((post, index) => (
      <PostItem
        key={ index }
        page={ this.props.page }
        post={ post }
        setPost={ this.props.setPost }
        usertype={ this.props.usertype }
      />
    ))
  }
}

export default Posts
