import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    let login = '',
        logout = '',
        myposts = '',
        addpost = '',
        users = '',
        register = ''

    const home = <li className='nav-item'>
                   <Link to='/' className='nav-link'>Home</Link>
                 </li>


    if(this.props.user === 'User') {
      login  = <li className='nav-item'>
                 <Link to='/login' className='nav-link'>Login</Link>
               </li>

      register = <li className='nav-item'>
                   <Link to='/register' className='nav-link'>Register</Link>
                 </li>
    }

    if(this.props.user !== 'User') {
      logout = <li className='nav-item'>
                 <Link to='/logout' className='nav-link'>Logout</Link>
               </li>

      users = <li className='nav-item'>
                <Link to='/users' className='nav-link'>Users</Link>
              </li>
    }

    if(this.props.user !== 'User' && this.props.usertype === 'user') {
      addpost  = <li className='nav-item'>
                   <Link to='/add' className='nav-link'>Create New Post</Link>
                 </li>

      myposts = <li className='nav-item'>
                  <Link to='/posts/user' className='nav-link'>My Posts</Link>
                </li>
    }

    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link to='/' className='navbar-brand'>
          <img src='/logo512.png' alt='logo' />
        </Link>

        <div className='navbar-text'>Hello { this.props.user }</div>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#headerContent' aria-controls='headerContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='headerContent'>
          <ul className='navbar-nav ml-auto'>
            { home }
            { login }
            { logout }
            { myposts }
            { addpost }
            { users }
            { register }
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
