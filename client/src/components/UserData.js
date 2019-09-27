import React, { Component } from 'react'

export class UserData extends Component {
  state = {
    handle: "",
    firstName: "",
    middleName: "",
    lastName: "",
    bio: "",
    location: "",
    avatar: "",
    updatedAt: "",
    createdAt: ""
  }

  getFullName = () => {
    let disp = 'User'
    const fn = this.state.firstName
    const mn = this.state.middleName
    const ln = this.state.lastName
    if(fn.length > 0) disp = fn
    if(mn.length > 0 && disp !== 'User') disp += ' ' + mn
    if(ln.length > 0 && disp !== 'User') disp += ' ' + ln
    return disp
  }

  componentDidMount() {
    this.setState({ handle: this.props.userdata.handle })
    this.setState({ firstName: this.props.userdata.id })
    this.setState({ middleName: this.props.userdata.id })
    this.setState({ lastName: this.props.userdata.id })
    this.setState({ bio: this.props.userdata.id })
    this.setState({ location: this.props.userdata.id })
    this.setState({ avatar: this.props.userdata.id })
    this.setState({ updatedAt: this.props.userdata.id })
    this.setState({ createdAt: this.props.userdata.id })
  }

  render() {
    return (
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{ this.state.handle }</h5>
          <h6 className='card-subtitle text-muted'>{ this.getFullName() }</h6>
          <p className='card-text font-weight-bold'>Bio:</p>
          <p className='card-text'>{ this.state.bio }</p>
          <p className='card-text font-weight-bold'>Location:</p>
          <p className='card-text'>{ this.state.location }</p>
          <p className='card-text font-weight-bold'>Avatar:</p>
          <p className='card-text'>{ this.state.avatar }</p>
        </div>
      </div>
    )
  }
}

export default UserData
