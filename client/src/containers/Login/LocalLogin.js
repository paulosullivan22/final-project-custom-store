import React from 'react';
import axios from 'axios'

class LocalLogin extends React.Component {  
  state = {
    username: this.props.match.params.id,
    password: '',
    message: '',
  }
  
  // Changes state whenever a character is typed into input field
  handleChange = e => {
    this.setState({ 
      password: e.target.value
    })
  }

  handleSubmit = e => {
  
    e.preventDefault()

    axios
      .post("/api/auth/passwordlogin", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        const { message } = res.data
        if (message) return this.setState({ message })
        this.props.setUser(res.data)
        this.props.history.push('/user') // on successful login, redirect to user homepage
        }
      )
      .catch(err => {
        console.log(err)
      })
  }

  render() {
      return (
        <div className="auth-container">

          <div className="auth-content-container local-login">

            <h1>Login</h1>

            <form onSubmit={this.handleSubmit}>

              <label htmlFor='password'>Password: </label> 
              <input 
                type='password'
                name='password'
                onChange={this.handleChange}
                />

              <button className="auth-button" type='submit'>Submit</button>

                {(this.state.message) ? 
                    <button className="error-message">{this.state.message}</button> :
                    null
                    }

          </form>
        </div>
      </div>
    )
  }
}


export default LocalLogin