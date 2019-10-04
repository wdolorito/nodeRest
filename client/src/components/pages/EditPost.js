import React, { Component } from 'react'
import tinymce from 'tinymce'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/table'

class EditPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
                   title: null,
                   body: null
                 }
  }
  componentDidMount() {
    console.log(this.props.post)

    tinymce.init({
      selector: '#title',
      theme: false,
      plugins: 'wordcount table',
      setup: editor => {
        this.setState({ editor })
        editor.on('keyup change', () => {
          console.log(editor.getContent())
        })
      }
    })

    tinymce.init({
      selector: '#body',
      theme: false,
      plugins: 'wordcount table',
      setup: editor => {
        this.setState({ editor })
        editor.on('keyup change', () => {
          console.log(editor.getContent())
        })
      }
    })
  }

  componentWillUnmount() {
    tinymce.remove(this.state.title)
    tinymce.remove(this.state.body)
  }

  render() {
    return (
      <React.Fragment>
        <h1>Edit Post</h1>
        <textarea
          rows='1'
          id='title'
          value={ this.props.post.title }
          onChange={e => console.log(e)}
        />
        <textarea
          id='body'
          value={ this.props.post.body }
          onChange={e => console.log(e)}
        />
      </React.Fragment>
    )
  }
}

export default EditPost
