import React, { Component } from 'react'

import axios from 'axios'

const CancelToken = axios.CancelToken

class DeletePost extends Component {
  constructor(props) {
    super(props)

    this.cancel = null
    this.interval = null

    this.state = {
                   deletelink: 'http://localhost:5000/post/',
                   delete: false,
                   deleteconfirm: false,
                   time: 5,
                   jwt: ''
                 }
  }

  componentDidMount() {
    if(this.props.jwt) this.setState({ jwt: this.props.jwt })
    if(this.props.post.id) {
      const fulllink = this.state.deletelink + this.props.post.id
      this.setState({ deletelink: fulllink})
    }
  }

  componentWillUnmount() {
    if(this.cancel !== null) this.cancel()
    clearInterval(this.interval)
    this.setState({ delete: false })
    this.setState({ deleteconfirm: false })
  }

  componentDidUpdate() {
    if(this.state.delete && this.state.deleteconfirm && this.cancel === null) this.deletePost()
  }

  handleClick = (e) => {
    e.preventDefault()

    switch(e.target.id) {
      case 'cancel':
        this.setState({ delete: false })
        this.setState({ deleteconfirm: false })
        break
      case 'confirm':
        this.setState({ deleteconfirm: true })
        break
      case 'delete':
        this.setState({ delete: true })
        break
      default:
        this.setState({ delete: false })
        this.setState({ deleteconfirm: false })
    }
  }

  deletePost = () => {
    axios({
      method: 'delete',
      url: this.state.deletelink,
      cancelToken: new CancelToken(c => this.cancel = c ),
      headers: {
        'Authorization': 'Bearer ' + this.state.jwt
      }
    })
    .then(
      (res) => {
        if(res.status === 204) {
          this.props.refresh()
        } else {
          clearInterval(this.interval)
          this.setState({ delete: false })
          this.setState({ deleteconfirm: false })
        }
      },
      (err) => {
        clearInterval(this.interval)
        this.setState({ delete: false })
        this.setState({ deleteconfirm: false })
        console.log(err)
      }
    )
  }

  countDown = () => {
    const time = this.state.time

    if(time === 1) {
      this.props.history.push('/')
    } else {
      this.setState(prevState => ({ time: prevState.time - 1}))
    }
  }

  render() {
    if(this.state.delete) {
      if(this.state.deleteconfirm) {
        if(this.interval === null) this.interval = setInterval(this.countDown, 1000)

        return (
          <React.Fragment>
            <div className='container'>
              <h1 className='text-center'>Deleting post</h1>
              <h5 className='text-center'>Redirecting in { this.state.time } seconds</h5>
            </div>
          </React.Fragment>
        )
      }

      return (
        <React.Fragment>
          <h1 className='text-danger'>Are you sure you want to delete this post?</h1>
          <h3>{ this.props.post.title }</h3>

          <div dangerouslySetInnerHTML={{ __html: this.props.post.body }} />

          <button onClick={ this.handleClick } id='cancel' className='btn btn-info mt-2 mb-2 mr-2'>cancel</button>
          <button onClick={ this.handleClick } id='confirm' className='btn btn-danger mt-2 mb-2'>confirm</button>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <h3>{ this.props.post.title }</h3>

        <div className='containter' dangerouslySetInnerHTML={{ __html: this.props.post.body }} />

        <button onClick={ this.handleClick } id='delete' className='btn btn-danger mt-2 mb-2'>delete</button>
      </React.Fragment>
    )
  }
}

export default DeletePost
