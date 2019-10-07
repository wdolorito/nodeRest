import React, { Component } from 'react'

export class UserData extends Component {
  constructor(props) {
    super(props)

    this.state = {
      handle: '',
      firstName: '',
      middleName: '',
      lastName: '',
      bio: '',
      location: '',
      avatar: '',
      updatedAt: '',
      createdAt: ''
    }
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
    this.setState({ firstName: this.props.userdata.firstName })
    this.setState({ middleName: this.props.userdata.middleName })
    this.setState({ lastName: this.props.userdata.lastName })
    this.setState({ bio: this.props.userdata.bio })
    this.setState({ location: this.props.userdata.location })
    this.setState({ avatar: this.props.userdata.avatar })
    this.setState({ updatedAt: this.props.userdata.updatedAt })
    this.setState({ createdAt: this.props.userdata.createdAt })
  }

  render() {
    return (
      <React.Fragment>
        <h5 className='card-title'>{ this.state.handle }</h5>
        <h6 className='card-subtitle text-muted mb-2'>{ this.getFullName() }</h6>
        <p className='card-text'><strong>Bio: </strong>{ this.state.bio }</p>
        <p className='card-text'><strong>Location: </strong>{ this.state.location }</p>
        <p className='card-text'><strong>Avatar: </strong>{ this.state.avatar }</p>
      </React.Fragment>
    )
  }
}

export default UserData
