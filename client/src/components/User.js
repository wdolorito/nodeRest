import React, { Component } from 'react'

export class User extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      email: '',
      updatedAt: '',
      createdAt: ''
    }
  }

  componentDidMount() {
    this.setState({ id: this.props.user._id })
    this.setState({ email: this.props.user.email })
    this.setState({ updatedAt: this.props.user.updatedAt })
    this.setState({ createdAt: this.props.user.createdAt })
  }

  render() {
    return (
      <React.Fragment>
        <p className='card-text'><strong>Email: </strong>{ this.state.email }</p>
        <p className='card-text'><strong>ID: </strong>{ this.state.id }</p>
      </React.Fragment>
    )
  }
}

export default User
