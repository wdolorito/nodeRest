import React, { Component } from 'react'

class EditUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      location: '',
      bio: '',
      avatar: '',
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
    let payload = {}

    if(this.state.firstName.length > 0) payload.firstName = this.state.firstName
    if(this.state.middleName.length > 0) payload.middleName = this.state.middleName
    if(this.state.lastName.length > 0) payload.lastName = this.state.lastName
    if(this.state.location.length > 0) payload.location = this.state.location
    if(this.state.bio.length > 0) payload.bio = this.state.bio
    if(this.state.avatar.length > 0) payload.avatar = this.state.avatar

    this.props.updateUser(payload)
    this.resetForm()
  }

  render() {
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

                <button type='submit' className='btn btn-primary mb-2'>Update</button>
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
