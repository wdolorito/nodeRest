import React, { Component } from 'react'
import Posts from '../Posts'

class MainPage extends Component {
  render() {
    return(
      <React.Fragment>
        <Posts
          page='main'
          posts={ this.props.posts }
          setPost={ this.props.setPost }
          usertype={ this.props.usertype }
        />
      </React.Fragment>
    )
  }
}

export default MainPage
