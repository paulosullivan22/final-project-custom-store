import React from 'react'
import axios from 'axios'
// import Typed from 'typed.js'

class UserHomePage extends React.Component {
  state = {
    city: '',
    temp: ''
  }

  componentDidMount() {
    axios.get("https://ipapi.co/json/")
      .then(res => {
        this.setState({ city: res.data.city })
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${res.data.city}&APPID=200ec4f6bebf09606b0090d0fd497aff`)
          .then(data => {
            console.log((data.data.main.temp - 273.15))
            this.setState({
              city: res.data.city,
              temp: (data.data.main.temp - 273.15).toFixed(1)
            })
            console.log(this.state)

          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  

    axios.get(`/api/store/personalstore/${this.props.user._id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    }

  render() {
    return (
      <div>

        <h1>Welcome from {this.state.city} where the temperature is {this.state.temp}°C</h1>
      </div>
    )
  }
}

export default UserHomePage;