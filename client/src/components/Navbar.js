import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const handleLogout = props => {
  console.log(props)
  axios.post("/api/auth/logout")
    .then(res => res.data)
    .then(() => {
        props.setUser(null)
      })
    .catch(err => {
      console.log(err)
    })
}


const Navbar = props => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
          <Link to='/store'>Main Store</Link>
          <Link to='/wishlist'>Wishlist</Link>
        </li>

        {!props.user ? (
            <>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/signup'>Signup</Link>
              </li>
            </>

        ) : (

            <>
              <li>
                <Link to='/user'>Profile</Link>
              </li>
              <li>
                <Link onClick={() => handleLogout(props)} to='/logout'>Logout</Link>
              </li>
            </>
            
        )}

      </ul>
    </nav>
  )
}

export default Navbar