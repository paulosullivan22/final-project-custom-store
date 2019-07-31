import React from 'react';
import { Link } from 'react-router-dom'

class Signup extends React.Component {  
  

  render() {
      return (
        <div className="auth-container">
          <h1>Signup</h1>

          <h5>Sign up for a new account using one of the options below.</h5>

          <Link to="/facialsignup">
            <button className="auth-button signup-auth">Sign up with a photo</button>
          </Link>

          <Link to="/localsignup">
            <button className="auth-button signup-auth">Sign up with a password</button>
          </Link>

        </div>
      )
  }
}


export default Signup