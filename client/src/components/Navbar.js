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
          <Link 
            className="nav-item" 
            to='/'>Home</Link>
        </li>
          {(props.user) ?
          <>
          <li>
            <Link 
              className="nav-item" 
              to='/store'>Main Store</Link>
          </li>
          <li>
            <Link 
              className="nav-item" 
              to='/wishlist'>Wishlist</Link>
          </li>
          </> :
          null } 

        {!props.user ? (
            <>
              <li>
                <Link 
                  className="nav-item" 
                  to='/login'>Login</Link>
              </li>
              <li>
                <Link 
                  className="nav-item" 
                  to='/signup'>Signup</Link>
              </li>
            </>

        ) : (

            <>
              <li>
                <Link 
                  className="nav-item" 
                  to='/user'>Profile</Link>
              </li>
              <li>
                <Link 
                  className="nav-item" 
                  onClick={() => handleLogout(props)} 
                  to='/logout'>Logout</Link>
              </li>
            </>
            
        )}

      </ul>
    </nav>
  )
}

export default Navbar