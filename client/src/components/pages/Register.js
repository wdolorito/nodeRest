import React, { Component } from 'react'
import axios from 'axios'

class Register extends Component {
  constructor(props) {
    super(props)

    this.interval = null

    this.state = {
      reglink: 'https://d0odtech.sytes.net/blog/register',
      handle: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      password: '',
      passcheck: '',
      location: '',
      bio: '',
      avatar: '',
      registration: false,
      time: 5
    }

    this.baseState = this.state
  }

  componentDidUpdate() {
    console.log(this.state.bio)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    this.resetForm()
  }

  resetForm = () => {
    this.setState(this.baseState)
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = (e) => {
    e.preventDefault()

    if(this.state.password === this.state.passcheck) {
      axios({
        method: 'post',
        url: this.state.reglink,
        data: {
          handle: this.state.handle,
          firstName: this.state.firstName,
          middleName: this.state.middleName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          location: this.state.location,
          bio: this.state.bio,
          avatar: this.state.avatar
        }
      })
      .then(
        (res) => {
          this.resetForm()
          this.setState({ registration: true })
        },
        (err) => {
          console.log(err)
          this.setState({ password: '', passcheck: ''})
        }
      )
    }
  }

  countDown = () => {
    const time = this.state.time

    if(time === 1) {
      this.props.history.push('/login')
    } else {
      this.setState(prevState => ({ time: prevState.time - 1}))
    }
  }

  render() {
    if(this.state.registration) {
      if(this.interval === null) this.interval = setInterval(this.countDown, 1000)

      return (
        <React.Fragment>
          <div className='container'>
            <h1 className='text-center'>Thank you for Registering { this.state.firstName }!</h1>
            <h5 className='text-center'>Redirecting to login page in { this.state.time } seconds</h5>
          </div>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <div className='container'>
          <h1 className='text-center'>Register for an account</h1>

          <div className='row'>
            <div className='col-md-3'>
            </div>
            <div className='col-md-6'>
              <form onSubmit={ this.submitHandler }>
                <div className='form-row'>
                  <div className='form-group col-md-12'>
                    <input
                      type='text'
                      className='form-control'
                      id='handleInput'
                      name='handle'
                      value={ this.state.handle }
                      onChange={ this.handleInput }
                      placeholder='Your Username*'
                      required />
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-4'>
                    <input
                      type='text'
                      className='form-control'
                      id='firstNameInput'
                      name='firstName'
                      value={ this.state.firstName }
                      onChange={ this.handleInput }
                      placeholder='First Name*'
                      required />
                  </div>
                  <div className='form-group col-md-4'>
                    <input type='text' className='form-control'
                    id='middleNameInput'
                    name='middleName'
                    value={ this.state.middleName }
                    onChange={ this.handleInput }
                    placeholder='Middle Name' />
                  </div>
                  <div className='form-group col-md-4'>
                    <input
                      type='text'
                      className='form-control'
                      id='lastNameInput'
                      name='lastName'
                      value={ this.state.lastName }
                      onChange={ this.handleInput }
                      placeholder='Last Name' />
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-12'>
                    <input type='text'
                    className='form-control'
                    id='emailInput'
                    name='email'
                    value={ this.state.email }
                    onChange={ this.handleInput }
                    placeholder='E-mail address (eg. user@ex.com)*'
                    required />
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-6'>
                    <input
                      type='password'
                      className='form-control'
                      id='passwordInput'
                      name='password'
                      value={ this.state.password }
                      onChange={ this.handleInput }
                      placeholder='Password*'
                      required />
                  </div>
                  <div className='form-group col-md-6'>
                    <input
                      type='password'
                      className='form-control'
                      id='passwordInput2'
                      name='passcheck'
                      value={ this.state.passcheck }
                      onChange={ this.handleInput }
                      placeholder='Re-enter password*'
                      required />
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-12'>
                    <input
                      type='text'
                      className='form-control'
                      id='locationInput'
                      name='location'
                      value={ this.state.location }
                      onChange={ this.handleInput }
                      placeholder='Where are you?' />
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-12'>
                    <textarea
                      rows='4'
                      className='form-control'
                      id='bioInput'
                      name='bio'
                      value={ this.state.bio }
                      onChange={ this.handleInput }
                      placeholder='Share some details about yourself'>
                    </textarea>
                  </div>
                </div>

                <div className='form-row'>
                  <div className='form-group col-md-12'>
                    <input
                      type='text'
                      className='form-control'
                      id='avatarInput'
                      name='avatar'
                      value={ this.state.avatar }
                      onChange={ this.handleInput }
                      placeholder='Link to your avatar' />
                  </div>
                </div>

                <button type='submit' className='btn btn-primary mb-2'>Register</button>
              </form>
            </div>
            <div className='col-md-3'>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Register
