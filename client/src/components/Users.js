import React, { Component } from 'react'
import User from './User'
import UserData from './UserData'

class Users extends Component {
  render() {
    return(<React.Fragment></React.Fragment>)
  }
}
/*<UserData key={ index } userdata={ data } />
<User key={ index + '_2' } user={ user } />
return this.props.users.map((user, index) => (
  user.map(data =>
    <React.Fragment>
      <h1>{ user }</h1>
      <h1>{ index }</h1>
      <h1>{ data }</h1>
    </React.Fragment>
  )
))
*/

export default Users
