import React from 'react';
import axios from 'axios'

class Login extends React.Component {  
  state = {
    username: '',
    password: '',
    message: ''
  }
  
  handleChange = e => {
    const { name, value } = e.target

    this.setState({ 
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    console.log(this.state.user)
    console.log(this.state.username)
    axios
      .post("/api/auth/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        this.props.setUser(res.data)
        this.props.history.push('/store')
        }
      )
      .catch(err => {
        this.setState({
          message: err.data.message
        })
      })
  }

  render() {
      return (
        <div>
          Login
          <form onSubmit={this.handleSubmit}>

            <label htmlFor='username'>Username: </label> 
            <input 
              type='text'
              name='username'
              onChange={this.handleChange}
              />

            <label htmlFor='password'>Password: </label> 
            <input 
              type='password'
              name='password'
              onChange={this.handleChange}
              />

            <button 
              type='submit'
              >
              Submit
              </button>

              {(this.state.message) ? 
                  <div>{this.state.message}</div> :
                  null
                  }

          </form>

          <a href="/auth/facebook"><button>Sign in with Facebook</button></a>

        </div>
      )
  }
}


export default Login