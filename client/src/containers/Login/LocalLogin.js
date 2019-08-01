import React from 'react';
import axios from 'axios'

class LocalLogin extends React.Component {  
  state = {
    username: '',
    password: '',
    message: '',
  }
  
  handleChange = e => {
    const { name, value } = e.target

    this.setState({ 
      [name]: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.props)

    axios
      .post("/api/auth/emaillogin", {
        username: window.location.href.split('/').reverse()[0],
        password: this.state.password
      })
      .then(res => {
        const { message } = res.data
        console.log('res: ' + res)
        if (message) return this.setState({ message })
        this.props.setUser(res.data)
        this.props.history.push('/store')
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

              <button 
              className="auth-button"
                type='submit'
                >
                Submit
                </button>

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