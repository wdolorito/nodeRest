import React, { Component } from 'react'
import User from './User'
import UserData from './UserData'

export class FullUser extends Component {
  render() {
    return(
      <React.Fragment>
        <UserData userdata={ this.props.userdata } />
        <User user={ this.props.user } />
      </React.Fragment>
    )
  }

}

export default FullUser
