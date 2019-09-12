import React, { Component } from 'react'

class Login extends Component {
  componentDidMount() {
    const newlog = (Math.floor(Math.random() * Math.floor(10))).toString()
    const newpass = (Math.floor(Math.random() * Math.floor(10))).toString()
    this.props.setLog(newlog)
    this.props.setPass(newpass)
  }

  render() {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <p>Log in here, foo!</p>
      </React.Fragment>
    )
  }
}

export default Login
