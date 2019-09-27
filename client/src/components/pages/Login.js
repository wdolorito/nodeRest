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
      }, 4000)

      return (
        <React.Fragment>
          <div className="container">
            <h1 className="text-center">Logging in now...</h1>
            <h5 className="text-center">Redirecting to your posts in 4 seconds</h5>
          </div>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <div className="container">
          <h1 className="text-center">Login to the site</h1>

          <div className="row">
            <div className="col-md-3">
            </div>
            <div className="col-md-6">
              <form onSubmit={ this.submitHandler }>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <input type="text"
                    className="form-control"
                    id="emailInput"
                    name="email"
                    value={ this.state.email }
                    onChange={ this.handleInput }
                    placeholder="E-mail address (eg. user@ex.com)"
                    required />
                  </div>
                  <div className="form-group col-md-12">
                    <input
                      type="password"
                      className="form-control"
                      id="passwordInput"
                      name="password"
                      value={ this.state.password }
                      onChange={ this.handleInput }
                      placeholder="Password"
                      required />
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary mb-2">Sign In</button>
                </div>
              </form>
            </div>
            <div className="col-md-3">
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Login
