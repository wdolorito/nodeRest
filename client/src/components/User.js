import React, { Component } from 'react'

export class User extends Component {
  state = {
    id: "",
    email: "",
    updatedAt: "",
    createdAt: ""
  }

  componentDidMount() {
    this.setState({ id: this.props.user._id })
    this.setState({ email: this.props.user.email })
    this.setState({ updatedAt: this.props.user.updatedAt })
    this.setState({ createdAt: this.props.user.createdAt })
  }

  render() {
    return (
      <div className='card'>
        <div className='card-body'>
          <h5 className="card-text"><strong>Email: </strong>{ this.state.email }</h5>
        </div>
      </div>
    )
  }
}

export default User
