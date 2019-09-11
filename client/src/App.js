import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import About from './components/pages/About'
import EditPost from './components/pages/EditPost'
import EditUser from './components/pages/EditUser'
import Login from './components/pages/Login'
import Logout from './components/pages/Logout'
import MyPosts from './components/pages/MyPosts'
import UserLookup from './components/pages/UserLookup'

class App extends Component {
  componentDidMount() {
    console.log('page opened as a mofo')
  }

  render() {
    return (
      <Router>
        <div className='App'>
        <Header />
          <div className='container'>
          <Route path='/about' component={About} />
          <Route path='/post/edit' component={EditPost} />
          <Route path='/user/edit' component={EditUser} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/posts/user' component={MyPosts} />
          <Route path='/users' component={UserLookup} />
          </div>
        <Footer />
        </div>
      </Router>
    )
  }
}

export default App;
