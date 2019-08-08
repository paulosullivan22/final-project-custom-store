import React from 'react';
import axios from 'axios'

class LocalSignup extends React.Component {  
  state = {
    username: '',
    password: '',
    gender: 'Male', // Default as male, changes if female or Not specified
    message: ''
  }
  
  handleChange = e => {
    let { name, value } = e.target

    // Ensures no gender is assigned if 'Not specified' is selected as gender
    // User will be shown both male and female collections
    if (value === "Not specified") value = '' 

    this.setState({ 
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    axios
      .post("/api/auth/passwordsignup", {
        username: this.state.username,
        password: this.state.password,
        gender: this.state.gender
      })
      .then((response) => {
        const { message } = response.data
        if (message) return this.setState({ message }) // if invalid credentials provided, error message is displayed to client
        this.props.setUser(response.data) // logs user in, providing user data across the app
        this.props.history.push("/user")
        })
      .catch(err => {
        console.log(err)
    })
  }

  render() {
      return (
        <div className="auth-container">

          <div className="auth-content-container local-sign-up">
          
            <h1>Sign up</h1>

            <form onSubmit={this.handleSubmit}>

              <label htmlFor='username'>Username: </label> 
              <input 
                type='text'
                name='username'
                onChange={this.handleChange}
                />

              <label htmlFor='gender'>Gender: </label> 
              <select name="gender" onChange={this.handleChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Not specified">Not specified</option>
              </select>

              <label htmlFor='password'>Password: </label> 
              <input 
                type='password'
                name='password'
                onChange={this.handleChange}
                />

              <button 
                className="auth-button"
                type='submit'
                >
                Submit
                </button>

                {(this.state.message) ? // if error message, error message is displayed
                    <button className="error-message">{this.state.message}</button> :
                    null
                    }

          </form>
        </div>
      </div>
    )
  }
}


export default LocalSignup