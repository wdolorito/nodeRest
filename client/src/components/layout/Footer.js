import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='card'>
      <div className='card-body'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-2'>
            </div>
            <div className='col-md-8 text-center'>
              <Link to='/'>Home</Link> | <Link to='/about'>About</Link>
            </div>
            <div className='col-md-2'>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
