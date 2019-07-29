import React from 'react';
import { Link } from 'react-router-dom'

class Signup extends React.Component {  
  

  render() {
      return (
        <div>
          <h1>Signup</h1>
        
          <Link to="/facialsignup">Sign up with a photo</Link><br />
          <Link to="/localsignup">Sign up with a password</Link>

        </div>
      )
  }
}


export default Signup