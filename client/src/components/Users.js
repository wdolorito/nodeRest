import React, { Component } from 'react'
import FullUser from './FullUser'

class Users extends Component {
  render() {
    return(
      this.props.users.map((auser, index) => (
        <div key={ index } className='card'>
          <div className='card-body'>
            <FullUser
              user={ auser[0] }
              userdata={ auser[1] }
            />
          </div>
        </div>
        )
      )
    )
  }
}

export default Users
