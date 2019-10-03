import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import axios from 'axios'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import About from './components/pages/About'
import EditPost from './components/pages/EditPost'
import EditUser from './components/pages/EditUser'
import Login from './components/pages/Login'
import Logout from './components/pages/Logout'
import MyPosts from './components/pages/MyPosts'
import Register from './components/pages/Register'
import UserLookup from './components/pages/UserLookup'

import Posts from './components/Posts'

const CancelToken = axios.CancelToken

class App extends Component {
  constructor(props) {
    super(props)

    this.cancel = null

    this.state = {
      postslink: 'https://d0odtech.sytes.net/blog/posts',
      loginlink: 'https://d0odtech.sytes.net/blog/login',
      logoutlink: 'https://d0odtech.sytes.net/blog/logout',
      userpostslink: 'https://d0odtech.sytes.net/blog/posts/byUser',
      userslink: 'https://d0odtech.sytes.net/blog/users',
      dispname: 'User',
      dispflag: false,
      log: 'User',
      pass: '',
      jwt: '',
      logflag: false,
      posts: [],
      userposts: [],
      userpostsstart: false,
      userpostsavail: false,
      userstate: [],
      usertype: 'user',
      users: [],
      lookupusers: false
    }
  }

  componentDidMount() {
    if(this.state.jwt === '') {
      this.setJwt(localStorage.getItem('jwt'))
    }

    axios.get(this.state.postslink)
     .then((res) => this.setState({ posts: res.data }))
  }

  componentDidUpdate() {
    localStorage.setItem('jwt', this.state.jwt)

    if(this.state.logflag) {
      this.doLogin()
    } else {
      if(this.state.dispflag && this.state.userstate.length > 0 ) {
        let disp = 'User'
        const fn = this.state.userstate[1].firstName
        const mn = this.state.userstate[1].middleName
        const ln = this.state.userstate[1].lastName
        if(fn.length > 0) disp = fn
        if(mn.length > 0 && disp !== 'User') disp += ' ' + mn
        if(ln.length > 0 && disp !== 'User') disp += ' ' + ln
        this.setState({ dispname: disp })
        this.setState({ dispflag: false })
      }
    }

    if(this.state.userpostsstart) {
      this.setUserpostsflag(false)
      this.getUserPosts()
      this.setState({ userpostsavail: true})
    }

    if(this.state.lookupusers) {
      this.resetLookup()
      this.doUserLookup()
    }
  }

  componentWillUnmount() {
    this.cancel()
  }

  setLog = (newlog) => {
    this.setState({ log: newlog })
  }

  resetLog = () => {
    this.setState({ log: 'User' })
  }

  setPass = (newpass) => {
    this.setState({ pass: newpass })
  }

  resetPass = () => {
    this.setState({ pass: '' })
  }

  setJwt = (newjwt) => {
    this.setState({ jwt: newjwt })
  }

  resetJwt = () => {
    this.setState({ jwt: '' })
    this.resetLogflag()
  }

  setLogflag = (flag) => {
    this.setState({ logflag: flag })
  }

  resetLogflag = () => {
    this.setState({ logflag: false })
  }

  doLogin = () => {
    this.resetLogflag()
    axios({
      method: 'post',
      url: this.state.loginlink,
      cancelToken: new CancelToken(c => this.cancel = c ),
      data: {
        email: this.state.log,
        password: this.state.pass,
      }
    })
    .then(
      (res) => {
        if(res.status === 200) {
          this.setJwt(res.data.token)
          this.setState({ userstate: res.data.luser })
          this.setState({ usertype: res.data.whoami })
          this.setState({ dispflag: true })
        }
      },
      (err) => {
        console.log(err)
      }
    )
  }

  doLogout = () => {
    axios({
      method: 'post',
      url: this.state.logoutlink,
      cancelToken: new CancelToken(c => this.cancel = c ),
      headers: {
        'Authorization': 'Bearer ' + this.state.jwt
      }
    })
    .then(
      (res) => {
        this.resetLog()
        this.resetPass()
        this.setState({ userposts: [] })
        this.setState({ dispname: 'User' })
        this.resetJwt()
      },
      (err) => {
        console.log(err)
        this.props.history.push('/login')
      }
    )
  }

  getUserPosts = () => {
    this.setState({ userposts: [] })
    if(this.state.log !== 'User') {
      axios({
        method: 'get',
        url: this.state.userpostslink,
        cancelToken: new CancelToken(c => this.cancel = c ),
        headers: {
          'Authorization': 'Bearer ' + this.state.jwt
        }
      })
      .then(
        (res) => {
          this.setState({ userposts: res.data })
          this.setUserpostsflag(false)
        },
        (err) => {
          console.log(err)
        }
      )
    }
  }

  setUserpostsflag = (flag) => {
    this.setState({ userpostsstart: flag })
  }

  updateUser = (updated) => {
    if(this.state.log !== 'User') {
      axios({
        method: 'get',
        url: this.state.userslink,
        cancelToken: new CancelToken(c => this.cancel = c ),
        headers: {
          'Authorization': 'Bearer ' + this.state.jwt
        }
      })
      .then(
        (res) => {
          console.log(res.data)
        },
        (err) => {
          console.log(err)
        }
      )
    }
  }

  setLookup = (lookup) => {
    this.setState({ lookupusers: lookup })
  }

  resetLookup = () => {
    this.setState({ lookupusers: false })
  }

  doUserLookup = () => {
    this.setState({ users: [] })
    axios({
      method: 'get',
      url: this.state.userslink,
      headers: {
        'Authorization': 'Bearer ' + this.state.jwt
      }
    })
    .then(
      (res) => {
        this.setState({ users: res.data })
      },
      (err) => {
        console.log(err)
      }
    )
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <div className='container'>
          <Header
            user={ this.state.dispname }
            usertype={ this.state.usertype } />
          <Route
            exact path='/'
            render={ (props) => (
              <React.Fragment>
                <Posts
                  posts={ this.state.posts }
                />
              </React.Fragment>
            )}
          />
          <Route path='/about' component={ About } />
          <Route path='/post/edit' component={ EditPost } />
          <Route path='/user/edit'
            render={ (props) => <EditUser
                                  { ...props }
                                  updateUser={ this.updateUser } /> }
          />
          <Route
            path='/login'
            render={ (props) => <Login
                                  { ...props }
                                  usertype={ this.state.usertype }
                                  setLog={ this.setLog }
                                  setPass={ this.setPass }
                                  setJwt={ this.setJwt }
                                  setLogflag={ this.setLogflag } /> }
          />
          <Route
            path='/logout'
            render={ (props) => <Logout
                                  { ...props }
                                  doLogout={ this.doLogout } /> }
          />
          <Route
            path='/posts/user'
            render={ (props) => <MyPosts
                                  { ...props }
                                  userposts={ this.state.userposts }
                                  userpostsavail={ this.state.userpostsavail }
                                  setUserpostsflag={ this.setUserpostsflag }
                                  user={ this.state.log } /> }
          />
          <Route path='/register' component={ Register } />
          <Route
            path='/users'
            render={ (props) => <UserLookup
                                  { ...props }
                                  users={ this.state.users }
                                  setLookup={ this.setLookup } /> }
          />
          <Footer />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
