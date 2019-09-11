import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <h1>Lame Blog Footer</h1>
      <Link to="/">Home</Link> | <Link to="/about">About</Link>
    </footer>
  )
}

export default Footer
