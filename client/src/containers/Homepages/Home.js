import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {

  render() {

    return (
      <div className='home-container'>
        <div className='shape'>


          <h1>Our future is a smart future.</h1>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    )
  }
}

export default Home