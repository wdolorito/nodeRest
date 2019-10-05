import React, { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react'

import axios from 'axios'

const CancelToken = axios.CancelToken

class AddPost extends Component {
  constructor(props) {
    super(props)

    this.cancel = null
    this.interval = null

    this.state = {
                   apiKey: 'j1bk4ddwcsvs9voch35lmgsnwvbnlhy21605dto1ktt6gy2c',
                   postlink: 'http://localhost:5000/post',
                   post_title: '',
                   post_body: '',
                   posting: false,
                   time: 5,
                   jwt: ''
                 }
  }

  componentDidMount() {
    if(this.props.jwt) this.setState({ jwt: this.props.jwt })
  }

  componentWillUnmount() {
    if(this.cancel !== null) this.cancel()
    clearInterval(this.interval)
    this.setState({ posting: false })
  }

  componentDidUpdate() {
    console.log(this.state.jwt)
    console.log(this.state.post_title)
    console.log(this.state.post_body)
    console.log(this.state.postlink)
  }

  handleEditorChange = (e) => {
    this.setState({ [e.target.id]: e.target.getContent()})
  }

  handleClick = (e) => {
    e.preventDefault()

    this.setState({ posting: true })

    this.createPost()
  }

  createPost = () => {
    axios({
      method: 'post',
      url: this.state.postlink,
      cancelToken: new CancelToken(c => this.cancel = c ),
      headers: {
        'Authorization': 'Bearer ' + this.state.jwt
      },
      data: {
        title: this.state.post_title,
        body: this.state.post_body
      }
    })
    .then(
      (res) => {
        if(res.status !== 201) {
          clearInterval(this.interval)
        } else {
          this.props.refresh()
        }
      },
      (err) => {
        clearInterval(this.interval)
        this.setState({ posting: false })
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
    if(this.state.posting) {
      if(this.interval === null) this.interval = setInterval(this.countDown, 1000)

      return (
        <React.Fragment>
          <div className='container'>
            <h1 className='text-center'>Creating post</h1>
            <h5 className='text-center'>Redirecting in { this.state.time } seconds</h5>
          </div>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <h1>Create Post</h1>

        <h6 className='mt-2'>Title</h6>
        <Editor
          apiKey={ this.state.apiKey }
          id='post_title'
          initialValue=''
          init={{
            menubar: false,
            toolbar: false,
            statusbar: false,
            forced_root_block : '',
            height: 60
          }}
          onChange={ this.handleEditorChange }
        />


        <h6 className='mt-2'>Body</h6>
        <Editor
          apiKey={ this.state.apiKey }
          id='post_body'
          initialValue=''
          init={{
            menubar: false,
            toolbar: true,
            statusbar: false
          }}
          onChange={ this.handleEditorChange }
        />
        <button onClick={ this.handleClick } className='btn btn-primary mt-2 mb-2'>Save</button>
      </React.Fragment>
    )
  }
}

export default AddPost
