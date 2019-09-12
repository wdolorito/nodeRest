import React, { Component } from 'react'

class Register extends Component {
  state = {
    handle: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    passcheck: "",
    location: "",
    bio: "",
    avatar: ""
  }

  componentDidUpdate() {
    // console.log(this.state.handle)
    // console.log(this.state.firstName)
    // console.log(this.state.middleName)
    // console.log(this.state.lastName)
    // console.log(this.state.email)
    // console.log(this.state.password)
    // console.log(this.state.passcheck)
    // console.log(this.state.location)
    // console.log(this.state.bio)
    // console.log(this.state.avatar)
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = (e) => {
    e.preventDefault()
    console.log('do axios here to backend')
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <h1 className="text-center">Register for an account</h1>

          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-8">
              <form onSubmit={ this.submitHandler }>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="handleInput"
                      name="handle"
                      value={ this.state.handle }
                      onChange={ this.handleInput }
                      placeholder="Your Username" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      id="firstNameInput"
                      name="firstName"
                      value={ this.state.firstName }
                      onChange={ this.handleInput }
                      placeholder="First Name" />
                  </div>
                  <div className="form-group col-md-4">
                    <input type="text" className="form-control"
                    id="middleNameInput"
                    name="middleName"
                    value={ this.state.middleName }
                    onChange={ this.handleInput }
                    placeholder="Middle Name" />
                  </div>
                  <div className="form-group col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      id="lastNameInput"
                      name="lastName"
                      value={ this.state.lastName }
                      onChange={ this.handleInput }
                      placeholder="Last Name" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input type="text"
                    className="form-control"
                    id="emailInput"
                    name="email"
                    value={ this.state.email }
                    onChange={ this.handleInput }
                    placeholder="E-mail address (eg. user@ex.com)" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="passwordInput"
                      name="password"
                      value={ this.state.password }
                      onChange={ this.handleInput }
                      placeholder="Password" />
                  </div>
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="passwordInput2"
                      name="passcheck"
                      value={ this.state.passcheck }
                      onChange={ this.handleInput }
                      placeholder="*Password check" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="locationInput"
                      name="location"
                      value={ this.state.location }
                      onChange={ this.handleInput }
                      placeholder="Where are you?" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="bioInput"
                      name="bio"
                      value={ this.state.bio }
                      onChange={ this.handleInput }
                      placeholder="Share some details about yourself" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      id="avatarInput"
                      name="avatar"
                      value={ this.state.avatar }
                      onChange={ this.handleInput }
                      placeholder="Link to your avatar" />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary mb-2">Register</button>
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

export default Register
