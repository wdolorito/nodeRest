import React, { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react'

import axios from 'axios'

const CancelToken = axios.CancelToken

class EditPost extends Component {
  constructor(props) {
    super(props)

    this.cancel = null
    this.interval = null

    this.state = {
                   apiKey: 'j1bk4ddwcsvs9voch35lmgsnwvbnlhy21605dto1ktt6gy2c',
                   updatelink: 'http://localhost:5000/post/',
                   post_body: '',
                   update: false,
                   time: 5,
                   jwt: ''
                 }
  }

  componentDidMount() {
    if(this.props.jwt) this.setState({ jwt: this.props.jwt })
    if(this.props.post.body) this.setState({ post_body: this.props.post.body })
    if(this.props.post.id) {
      const fulllink = this.state.updatelink + this.props.post.id
      this.setState({ updatelink: fulllink})
    }
  }

  componentWillUnmount() {
    if(this.cancel !== null) this.cancel()
    clearInterval(this.interval)
    this.setState({ update: false })
  }

  handleEditorChange = (e) => {
    this.setState({ [e.target.id]: e.target.getContent()})
  }

  handleClick = (e) => {
    e.preventDefault()

    this.setState({ update: true })

    this.updatePost()
  }

  updatePost = () => {
    axios({
      method: 'put',
      url: this.state.updatelink,
      cancelToken: new CancelToken(c => this.cancel = c ),
      headers: {
        'Authorization': 'Bearer ' + this.state.jwt
      },
      data: {
        body: this.state.post_body
      }
    })
    .then(
      (res) => {
        if(res.status === 200) {
          this.props.refresh()
        } else {
          clearInterval(this.interval)
          this.setState({ update: false })
        }

      },
      (err) => {
        clearInterval(this.interval)
        this.setState({ update: false })
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
    if(this.state.update) {
      if(this.interval === null) this.interval = setInterval(this.countDown, 1000)

      return (
        <React.Fragment>
          <div className='container'>
            <h1 className='text-center'>Updating post</h1>
            <h5 className='text-center'>Redirecting in { this.state.time } seconds</h5>
          </div>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <h1>Edit Post</h1>

        <h3>{ this.props.post.title }</h3>

        <h6 className='mt-2'>Body</h6>
        <Editor
          apiKey={ this.state.apiKey }
          id='post_body'
          initialValue={ this.props.post.body }
          init={{
            menubar: false,
            toolbar: true,
            statusbar: false
          }}
          onChange={ this.handleEditorChange }
        />
        <div className='text-center'><button onClick={ this.handleClick } className='btn btn-primary mt-2 mb-2'>Save</button></div>
      </React.Fragment>
    )
  }
}

export default EditPost
