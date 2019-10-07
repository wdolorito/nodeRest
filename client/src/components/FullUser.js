import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import User from './User'
import UserData from './UserData'

export class FullUser extends Component {
  constructor(props) {
    super(props)

    this.state = {
      useredit: {},
      toEdit: false,
      toDelete: false
    }

    this.baseState = this.state
  }

  componentDidMount() {
    const userobj = []
    userobj.push(this.props.user)
    userobj.push(this.props.userdata)
    this.setState({ useredit: userobj })
  }

  componentDidUpdate() {
    if(this.state.toEdit) this.props.setUser(this.state.useredit)
  }

  componentWillUnmount() {
    this.setState(this.baseState)
  }

  handleClick = (e) => {
    e.preventDefault()

    switch(e.target.id) {
      case 'edit':
        this.setState({ toEdit: true })
        break
      case 'delete':
        this.setState({ toDelete: true })
        break
      default:
        console.log('something else')
    }
  }
  render() {
    if(this.state.toEdit === true) {
      return <Redirect to='/user/edit' />
    }

    if(this.state.toDelete === true) {
      console.log('deleting')
    }

    let useredit = '',
        userdel = ''
    useredit = <button type='button' onClick={ this.handleClick } id='edit' className='btn btn-warning'>edit</button>
    userdel = <button type='button' onClick={ this.handleClick } id='delete' className='btn btn-danger'>delete</button>

    return(
      <React.Fragment>
        <UserData userdata={ this.props.userdata } />
        <User user={ this.props.user } />
        { useredit } { userdel }
      </React.Fragment>
    )
  }

}

export default FullUser
