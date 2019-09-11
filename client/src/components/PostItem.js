import React, { Component } from 'react'

export class PostItem extends Component {
  render() {
    const { author, title, body } = this.props.post

    return (
      <div className='container'>
        <h1>{ title }</h1>
        <h3>{ author }</h3>
        <p>{ body }</p>
      </div>
    )
  }
}

export default PostItem
