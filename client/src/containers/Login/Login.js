import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  state = {
    username: '',
    message: ''
  }

  handleChange = e => { // sets user to value user enters in input 
    this.setState({
      username: e.target.value
    })
  }

  handleClick = path => {
    axios.post('/api/auth/login', { username: this.state.username})
      .then(res => {
        const { message } = res.data
        if (message) return this.setState({ message })
        // redirects user to their choice of signup page
        return this.props.history.push(`/${path}login/${this.state.username}`)
      })
      .catch(err => console.log(err))
  }

  render() {

    return (
      <div className="auth-container">

        <div className="auth-content-container login-home">

        <h1>Login</h1>

          <p>Please enter your username:</p>
          <input type="text" name="username" onChange={this.handleChange} />

          <button 
            className="button auth-button"
            onClick={() => this.handleClick("facial")}>
              Facial Login
              </button>

          <button 
            className="button auth-button"
            onClick={() => this.handleClick("password")}>
              Password Login
              </button>

          {(this.state.message.length) ? // if message received from DB, display message
            <button className="error-message">{this.state.message}</button> : null
            }

          </div>

      </div>
    )
  }
}

export default Login