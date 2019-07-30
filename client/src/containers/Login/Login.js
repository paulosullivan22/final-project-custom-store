import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  state = {
    username: '',
    message: ''
  }

  handleChange = e => {

    this.setState({
      username: e.target.value
    })
  }

  handleClick = path => {
    axios.post('/api/auth/login', { username: this.state.username})
      .then(res => {
        const { message } = res.data
        if (message) return this.setState({ message })
        return this.props.history.push(`/${path}login/${this.state.username}`)

      })
      .catch(err => console.log(err))
  }

  render() {

    return (
      <div>

        <h1>Login</h1>

          <label htmlFor="username">Enter your username</label>
          <input type="text" name="username" onChange={this.handleChange} />

          <button onClick={() => this.handleClick("facial")}>Facial Login</button>
          <button onClick={() => this.handleClick("email")}>Password Login</button>

          {(this.state.message.length) ? 
            <div>{this.state.message}</div> : null
            }

      </div>
    )
  }
}

export default Login