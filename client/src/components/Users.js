import React, { Component } from 'react'
import User from './User'
import UserData from './UserData'

class Users extends Component {
  render() {
    return(
      this.props.users.map((user, index) => (
        <div key={ user[0]._id } className='card'>
          <div className='card-body'>
            <UserData userdata={ user[1] } />
            <User user={ user[0] } />
          </div>
        </div>
          )
        )
      )
  }
}

export default Users
