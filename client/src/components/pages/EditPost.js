import React, { Component } from 'react'
import { Editor } from '@tinymce/tinymce-react'

class EditPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
                   apiKey: 'j1bk4ddwcsvs9voch35lmgsnwvbnlhy21605dto1ktt6gy2c',
                   post_body: '',
                   post_title: ''
                 }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
  }

  handleEditorChange = (e) => {
    this.setState({ [e.target.id]: e.target.getContent()})
  }

  handleClick = (e) => {
    e.preventDefault()

    console.log(this.state.post_title)
    console.log(this.state.post_body)
  }

  render() {
    return (
      <React.Fragment>
        <h1>Edit Post</h1>
        <Editor
          apiKey={ this.state.apiKey }
          id='post_title'
          initialValue={ this.props.post.title }
          init={{
            height: 100,
            menubar: false,
            toolbar: false
          }}
          onChange={ this.handleEditorChange }
        />
        <Editor
          apiKey={ this.state.apiKey }
          id='post_body'
          initialValue={ this.props.post.body }
          init={{
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
          }}
          onChange={ this.handleEditorChange }
        />
        <button onClick={ this.handleClick } className='btn btn-primary mb-2'>Save</button>
      </React.Fragment>
    )
  }
}

export default EditPost
