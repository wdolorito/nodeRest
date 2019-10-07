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
          usertype={ this.props.usertype }
          setUser={ this.props.setUser }
          setLookup={ this.props.setLookup }
        />
      </React.Fragment>
    )
  }
}

export default UserLookup
