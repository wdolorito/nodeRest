import React, { Component } from 'react'

import axios from 'axios'

const CancelToken = axios.CancelToken

class EditUser extends Component {
  constructor(props) {
    super(props)

    this.cancel = null
    this.interval = null

    this.state = {
      editlink: 'http://localhost:5000/user/',
      firstName: '',
      middleName: '',
      lastName: '',
      location: '',
      bio: '',
      avatar: '',
      update: false,
      time: 5
    }

    this.baseState = this.state
  }

  componentDidMount() {
    const user = this.props.user[0]
    const userdata = this.props.user[1]

    this.setState({ editlink: this.state.editlink + user._id})
    this.setState({ firstName: userdata.firstName })
    this.setState({ middleName: userdata.middleName })
    this.setState({ lastName: userdata.lastName })
    this.setState({ location: userdata.location })
    this.setState({ bio: userdata.bio })
    this.setState({ avatar: userdata.avatar })
  }

  componentWillUnmount() {
    if(this.cancel !== null) this.cancel()
    clearInterval(this.interval)
    this.setState({ update: false })
  }

  resetForm = () => {
    this.setState(this.baseState)
  }

  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = (e) => {
    e.preventDefault()

    this.setState({ update: true })

    this.updateUser()
  }

  updateUser = () => {
    axios({
      method: 'put',
      url: this.state.editlink,
      cancelToken: new CancelToken(c => this.cancel = c ),
      headers: {
        'Authorization': 'Bearer ' + this.props.jwt
      },
      data: {
        firstName: this.state.firstName,
        middleName: this.state.middleName,
        lastName: this.state.lastName,
        location: this.state.location,
        bio: this.state.bio,
        avatar: this.state.avatar
      }
    })
    .then(
      (res) => {
        if(res.status === 200) {
          this.props.setLookup(true)
        } else {
          clearInterval(this.interval)
          this.setState({ update: false })
        }

      },
      (err) => {
        clearInterval(this.interval)
        this.setState({ update: false })
        console.log(err)
      }
    )
  }

  countDown = () => {
    const time = this.state.time

    if(time === 1) {
      this.props.history.push('/users')
    } else {
      this.setState(prevState => ({ time: prevState.time - 1}))
    }
  }

  render() {
    if(this.state.update) {
      if(this.interval === null) this.interval = setInterval(this.countDown, 1000)

      return (
        <React.Fragment>
          <div className='container'>
            <h1 className='text-center'>Updating user</h1>
            <h5 className='text-center'>Redirecting in { this.state.time } seconds</h5>
          </div>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <div className='container'>
          <h1 className='text-center'>Edit your User details</h1>

          <div className='row'>
            <div className='col-md-3'>
            </div>
            <div className='col-md-6'>
              <form onSubmit={ this.submitHandler }>
                <div className='form-row'>
                  <div className='form-group col-md-4'>
                    <input
                      type='text'
                      className='form-control'
                      id='firstNameInput'
                      name='firstName'
                      value={ this.state.firstName }
                      onChange={ this.handleInput }
                      placeholder='First Name' />
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

                <div className='text-center'>
                  <button type='submit' className='btn btn-primary mb-2'>update</button>
                </div>
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

export default EditUser
