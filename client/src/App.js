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
  state = {
    postlink: "http://192.168.15.20:3000/posts",
    log: "User",
    pass: "",
    posts: []
  }

  componentDidMount() {
    axios.get(this.state.postlink)
     .then((res) => this.setState({ posts: res.data }))
  }

  setLog = (newlog) => {
    this.setState({ log: newlog })
  }

  setPass = (newpass) => {
    this.setState({ pass: newpass })
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
                                  setPass={ this.setPass } /> }
          />
          <Route path='/logout' component={ Logout } />
          <Route path='/posts/user' component={ MyPosts } />
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
