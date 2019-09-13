import React, { Component } from 'react'
import Posts from '../Posts'

class MyPosts extends Component {
  componentDidMount() {
    this.props.setUserpostsflag(true)
  }

  render() {
    if(this.props.userpostsavail && this.props.userposts.length !== 0) {
      return(
        <React.Fragment>
          <Posts
            posts={ this.props.userposts }
          />
        </React.Fragment>
      )
    }

    return(
      <React.Fragment>
        <h1>Looking up your posts...</h1>
      </React.Fragment>

    )
  }
}

export default MyPosts
