import React from 'react';
import axios from 'axios'
import Webcam from 'react-webcam'
import LoginFileUpload from '../../FileUploads/LoginFileUpload'


class FacialLogin extends React.Component {
  state = {
    errorMessage: '', // displays any error message received from backend to client
    mobile: false,
    username: this.props.match.params.id,
    image: ''
  }

  // Checks client device, hides camera if mobile as RTC camera isn't mobile compatible
  componentDidMount() { 
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      this.setState({ mobile: true })
    }
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  // If user chooses to take a photo, triggers login check 
  capture = () => {
    this.setState({ image: this.webcam.getScreenshot() }, () => this.userLogin())
  };

  // If user chooses to upload a file, triggers login check
  importUploadedFile = file => {
    this.setState({ image: file }, () => this.userLogin())
  }

  // Checks photo similarily from either captured photo or file upload
  // if same user, logins user in and redirects to user homepage
  userLogin = () => {
    axios.post("/api/auth/faciallogin", { username: this.state.username, image: this.state.image }) 
      .then(res => {
        const { message } = res.data
        if (!message) {
          this.props.setUser(res.data)
          this.props.history.push('/user')
        } else {
          this.setState({ errorMessage: message })
        }
      })
      .catch(err => console.log(err))
    }

 
    render() {

      const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      }

      return (
        <div className="facial-auth-container">

          <div className="facial-auth-content facial-login">
              
              <h1>Facial Login</h1>
              <hr className="title-hr"/>

              {this.state.mobile ? // hides camera if on mobile, displaying just file upload option
                null 
                :
                <Webcam
                  audio={false}
                  height={350}
                  ref={this.setRef}
                  screenshotFormat="image/jpeg"
                  width={350}
                  videoConstraints={videoConstraints}
                />}

              {(this.state.errorMessage) ? // if any error messages, display to client
                  <button className="error-message">{this.state.errorMessage}</button> : null
                }

              {this.state.mobile ? // hides this section on mobile
              null 
              :
              <>
                <button 
                  className="auth-button" id="facial-login-capture"
                  onClick={this.capture}>
                    Capture photo & login</button>
                
                  <hr />
                  <h4>Or</h4>
                  <hr />
              </>
              }

              <LoginFileUpload
                exportFile={this.importUploadedFile}
                />

            </div>
        </div>
      )
    }
  }

export default FacialLogin