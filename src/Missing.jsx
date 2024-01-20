import React from 'react'
import {Link} from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
      <h2>post not found</h2>
          <p>we have a problem</p>
          <p> 
            <Link to="/">Return Home</Link>
          </p>
          
    </main>
  )
}

export default Missing