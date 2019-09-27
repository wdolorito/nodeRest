import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <img src="/logo512.png" alt="logo" />
        </Link>
        <div className="navbar-text">Hello { this.props.user }</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#headerContent" aria-controls="headerContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="headerContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="nav-link">Logout</Link>
            </li>
            <li className="nav-item">
              <Link to="/posts/user" className="nav-link">My Posts</Link>
            </li>
{/*
            <li className="nav-item">
              <Link to="/post/edit" className="nav-link">Edit Post</Link>
            </li>
*/}
            <li className="nav-item">
              <Link to="/users" className="nav-link">Lookup users</Link>
            </li>
{/*
            <li className="nav-item">
              <Link to="/user/edit" className="nav-link">Edit user</Link>
            </li>
*/}
            <li className="nav-item">
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
