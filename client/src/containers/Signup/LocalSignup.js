import React from 'react';
import axios from 'axios'

class LocalSignup extends React.Component {  
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
      .post("/api/auth/localsignup", {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        console.log(response.data)
        const { message } = response.data
        if (message) return this.setState({ message })
        this.props.setUser(response.data)
        this.props.history.push("/")
        
        }
      )
      .catch(err => {
        console.log(err)
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

        </div>
      )
  }
}


export default LocalSignup