import React, { Component } from 'react'
import Users from '../Users'

class UserLookup extends Component {
  componentDidMount() {
    this.props.setLookup(true)
  }

  render() {
    return (
      <React.Fragment>
        <Users
          users={ this.props.users }
        />
      </React.Fragment>
    )
  }
}

export default UserLookup
