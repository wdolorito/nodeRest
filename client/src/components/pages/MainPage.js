import React, { Component } from 'react'
import Posts from '../Posts'

class MainPage extends Component {
  handleClick = (e) => {
    e.preventDefault()

    this.props.refresh()
  }

  render() {
    return(
      <React.Fragment>
        <Posts
          page='main'
          posts={ this.props.posts }
          setPost={ this.props.setPost }
          usertype={ this.props.usertype }
        />
        <div className='text-right'>
          <button onClick={ this.handleClick } id='cancel' className='btn btn-primary mt-2 mb-2'>refresh all</button>
        </div>
      </React.Fragment>
    )
  }
}

export default MainPage
