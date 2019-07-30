import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Home extends React.Component {

  componentDidMount() {
    axios.get("https://ipapi.co/json/")
      .then(res => {
        console.log(res.data.city)
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${res.data.city}&APPID=200ec4f6bebf09606b0090d0fd497aff`)
          .then(data => console.log(data))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

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