import React, { Component } from 'react'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      loggedin: false
    }

    this.baseState = this.state
  }

  resetForm = () => {
    this.setState(this.baseState)
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = (e) => {
    e.preventDefault()

    this.props.setLog(this.state.email)
    this.props.setPass(this.state.password)
    this.resetForm()
    this.props.setLogflag(true)
    this.setState({ loggedin: true })
  }

  render() {
    if(this.state.loggedin) {
      setTimeout(() => {
        this.props.history.push('/posts/user')
      }, 5000)

      return (
        <React.Fragment>
          <div className="container">
            <h1 className="text-center">Logging in now...</h1>
            <h5 className="text-center">Redirecting to your posts in 5 seconds</h5>
          </div>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <div className="container">
          <h1 className="text-center">Login to the site</h1>

          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-8">
              <form onSubmit={ this.submitHandler }>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input type="text"
                    className="form-control"
                    id="emailInput"
                    name="email"
                    value={ this.state.email }
                    onChange={ this.handleInput }
                    placeholder="E-mail address (eg. user@ex.com)" />
                    <input
                      type="text"
                      className="form-control"
                      id="passwordInput"
                      name="password"
                      value={ this.state.password }
                      onChange={ this.handleInput }
                      placeholder="Password" />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary mb-2">Sign In</button>
              </form>
            </div>
            <div className="col-md-2">
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Login
