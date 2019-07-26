import React from 'react';
import axios from 'axios'

class Signup extends React.Component {  
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

    axios
      .post("/api/auth/signup", {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        console.log(response.data)
        this.props.setUser(response.data)
        }
      )
      .catch(err => {
        this.setState({
          message: err.data
        })
      })
  }

  render() {
      return (
        <div>
          Signup
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

          <a href="/auth/facebook"><button>Register with Facebook</button></a>

        </div>
      )
  }
}


export default Signup