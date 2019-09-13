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

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      postslink: "http://192.168.15.20:3000/posts",
      loginlink: "http://192.168.15.20:3000/login",
      logoutlink: "http://192.168.15.20:3000/logout",
      userpostslink: "http://192.168.15.20:3000//posts/byUser",
      log: "User",
      pass: "",
      jwt: "",
      logflag: false,
      posts: [],
      userposts: [],
      userpostsstart: false,
      userpostsavail: false
    }
  }

  componentDidMount() {
    if(this.state.jwt === "") {
      this.setJwt(localStorage.getItem('jwt'))
    }

    axios.get(this.state.postslink)
     .then((res) => this.setState({ posts: res.data }))
  }

  componentDidUpdate() {
    console.log(this.state.jwt)
    console.log(this.state.logflag)
    localStorage.setItem('jwt', this.state.jwt)

    if(this.state.logflag) {
      this.doLogin()
    }

    if(this.state.userpostsstart) {
      this.setUserpostsflag(false)
      this.getUserPosts()
      this.setState({ userpostsavail: true})
    }
  }

  setLog = (newlog) => {
    this.setState({ log: newlog })
  }

  resetLog = () => {
    this.setState({ log: "" })
  }

  setPass = (newpass) => {
    this.setState({ pass: newpass })
  }

  resetPass = () => {
    this.setState({ pass: "" })
  }

  setJwt = (newjwt) => {
    this.setState({ jwt: newjwt })
  }

  resetJwt = () => {
    this.setState({ jwt: "" })
    this.resetLogflag()
  }

  setLogflag = (flag) => {
    this.setState({ logflag: flag })
  }

  resetLogflag = () => {
    this.setState({ logflag: false })
  }

  doLogin = () => {
    axios({
      method: 'post',
      url: this.state.loginlink,
      data: {
        email: this.state.log,
        password: this.state.pass,
      }
    })
    .then(
      (res) => {
        this.setJwt(res.data.token)
        this.resetLogflag()
      },
      (err) => {
        console.log(err)
        this.setState({ password: '' })
      }
    )
  }

  doLogout = () => {
    axios({
      method: 'post',
      url: this.state.logoutlink,
      headers: {
        'Authorization': 'Bearer ' + this.state.jwt
      }
    })
    .then(
      (res) => {
        this.resetLog()
        this.resetLog()
        this.resetJwt()
      },
      (err) => {
        console.log(err)
      }
    )
  }

  getUserPosts = () => {
    console.log('getting user posts', this.state.jwt)
    axios({
      method: 'get',
      url: this.state.userpostslink,
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

  setUserpostsflag = (flag) => {
    this.setState({ userpostsstart: flag })
  }

  render() {
    return (
      <Router>
        <div className='App'>
          <div className='container'>
          <Header user={ this.state.log }/>
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
          <Route path='/user/edit' component={ EditUser } />
          <Route
            path='/login'
            render={ (props) => <Login
                                  { ...props }
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
                                  setUserpostsflag={ this.setUserpostsflag } /> }
          />
          <Route path='/register' component={ Register } />
          <Route path='/users' component={ UserLookup } />
          <Footer />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
