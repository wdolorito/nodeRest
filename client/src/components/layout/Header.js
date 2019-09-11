import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <h1>Lame Blog Header</h1>
      <Link to="/">Home</Link> | <Link to="/about">About</Link> |
      <Link to="/post/edit">Edit Post</Link> | <Link to="/user/edit">EditUser</Link> |
      <Link to="/login">Login</Link> | <Link to="/logout">Logout</Link> |
      <Link to="/posts/user">My Posts</Link> | <Link to="/users">Users</Link>
    </header>
  )
}

export default Header
