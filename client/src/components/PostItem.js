import React, { Component } from 'react'

export class PostItem extends Component {
  state = {
    id: '',
    author: '',
    handle: '',
    title: '',
    body: '',
    updatedAt: '',
    createdAt: ''
  }

  componentDidMount() {
    this.setState({ id: this.props.post.id })
    this.setState({ author: this.props.post.author })
    this.setState({ handle: this.props.post.handle })
    this.setState({ title: this.props.post.title })
    this.setState({ body: this.props.post.body })
    this.setState({ updatedAt: this.props.post.updatedAt })
    this.setState({ createdAt: this.props.post.createdAt })
  }

  render() {
    return (
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{ this.state.title }</h5>
          <h6 className='card-subtitle text-muted'>{ this.state.author }</h6>
          <p className='card-text'>{ this.state.body }</p>
        </div>
      </div>
    )
  }
}

export default PostItem
