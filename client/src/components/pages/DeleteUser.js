import React, { Component } from 'react'

import axios from 'axios'

const CancelToken = axios.CancelToken

class DeleteUser extends Component {
  constructor(props) {
    super(props)

    this.cancel = null
    this.interval = null

    this.state = {
      deletelink: 'http://localhost:5000/user/',
      user: {},
      userdata: {},
      firstName: '',
      middleName: '',
      lastName: '',
      location: '',
      bio: '',
      avatar: '',
      delete: false,
      deleteconfirm: false,
      time: 5
    }
  }

  componentDidMount() {
    const user = this.props.user[0]
    const userdata = this.props.user[1]

    this.setState({ deletelink: this.state.deletelink + user._id})
    this.setState({ user: user })
    this.setState({ userdata: userdata })
  }

  componentWillUnmount() {
    if(this.cancel !== null) this.cancel()
    clearInterval(this.interval)
    this.setState({ delete: false })
    this.setState({ deleteconfirm: false })
  }

  componentDidUpdate() {
    if(this.state.delete && this.state.deleteconfirm && this.cancel === null) this.deleteUser()
  }

  handleClick = (e) => {
    e.preventDefault()

    switch(e.target.id) {
      case 'cancel':
        this.setState({ delete: false })
        this.setState({ deleteconfirm: false })
        break
      case 'confirm':
        this.setState({ deleteconfirm: true })
        break
      case 'delete':
        this.setState({ delete: true })
        break
      default:
        this.setState({ delete: false })
        this.setState({ deleteconfirm: false })
    }
  }

  deleteUser = () => {
    axios({
      method: 'delete',
      url: this.state.deletelink,
      cancelToken: new CancelToken(c => this.cancel = c ),
      headers: {
        'Authorization': 'Bearer ' + this.props.jwt
      }
    })
    .then(
      (res) => {
        if(res.status === 204) {
          this.props.setLookup(true)
        } else {
          clearInterval(this.interval)
          this.setState({ delete: false })
          this.setState({ deleteconfirm: false })
        }
      },
      (err) => {
        clearInterval(this.interval)
        this.setState({ delete: false })
        this.setState({ deleteconfirm: false })
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
    if(this.state.delete) {
      if(this.state.deleteconfirm) {
        if(this.interval === null) this.interval = setInterval(this.countDown, 1000)

        return (
          <React.Fragment>
            <div className='container'>
              <h1 className='text-center'>Deleting user</h1>
              <h5 className='text-center'>Redirecting in { this.state.time } seconds</h5>
            </div>
          </React.Fragment>
        )
      }

      return (
        <React.Fragment>
          <div className='container'>
            <h1 className='text-danger'>Are you sure you want to delete this user?</h1>

            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>{ this.state.userdata.handle }</h5>
                <p className='card-text'><strong>Email: </strong>{ this.state.user.email }</p>
                <p className='card-text'><strong>ID: </strong>{ this.state.user._id }</p>
                <button onClick={ this.handleClick } id='cancel' className='btn btn-info mt-2 mb-2 mr-2'>cancel</button>
                <button onClick={ this.handleClick } id='confirm' className='btn btn-danger mt-2 mb-2'>confirm</button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{ this.state.userdata.handle }</h5>
            <p className='card-text'><strong>Email: </strong>{ this.state.user.email }</p>
            <p className='card-text'><strong>ID: </strong>{ this.state.user._id }</p>
            <button onClick={ this.handleClick } id='delete' className='btn btn-danger mt-2 mb-2'>delete</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default DeleteUser
