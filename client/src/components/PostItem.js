import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export class PostItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      author: '',
      handle: '',
      title: '',
      body: '',
      updatedAt: '',
      createdAt: '',
      toEdit: false
    }
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

  componentWillUnmount() {
    this.setState({ toEdit: false })
  }

  handleClick = (e) => {
    e.preventDefault()

    this.props.setPost(this.props.post)
    this.setState({ toEdit: true })
  }

  render() {
    if(this.state.toEdit === true) {
      return <Redirect to='/post/edit' />
    }

    let postid = ''
    if(!(this.props.usertype === 'user' && this.props.page === 'main')) {
      postid = <button type='button' onClick={ this.handleClick } id={ this.state.id } className='btn btn-info'>edit</button>
    }

    let created, updated
    if(this.state.createdAt) {
      created = new Date(this.state.createdAt)
      created = created.toLocaleString("en-US")
    }

    if(this.state.updatedAt) {
      updated = new Date(this.state.updatedAt)
      updated = updated.toLocaleString("en-US")
    }

    return (
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{ this.state.title }</h5>
          <h6 className='card-subtitle text-muted'>by { this.state.author } on { created }</h6>
          <h6 className='card-subtitle text-muted mt-1 font-italic'>last updated { updated }</h6>
          <div className='card-text mt-2' dangerouslySetInnerHTML={{ __html: this.state.body }} />
          { postid }
        </div>
      </div>
    )
  }
}

export default PostItem
