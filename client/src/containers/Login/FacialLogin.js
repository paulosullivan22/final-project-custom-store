import React from 'react';
import axios from 'axios'
import Webcam from 'react-webcam'
import LoginFileUpload from './../../components/LoginFileUpload'


class FacialLogin extends React.Component {
  state = {
    errorMessage: '',
    mobile: false 
  }

  componentDidMount() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      this.setState({ mobile: true })
    }
  }

  importUploadedFile = file => {
    const username = window.location.href.split('/').reverse()[0]
    axios.post("/api/auth/faciallogin", { username: username, image: file })
      .then(res => {
        const { message } = res.data
        return (message) ? this.setState({ errorMessage: message }) : this.props.setUser(res.data)
      })
      .catch(err => console.log(err))
  }


  setRef = webcam => {
    this.webcam = webcam;
  };
 
  capture = () => {
    const username = window.location.href.split('/').reverse()[0]
    const imageSrc = this.webcam.getScreenshot()

    const redirect = user => {
      this.props.setUser(user)
      this.props.history.push("/user")
    }

    axios.post(`/api/auth/faciallogin`, { image: imageSrc, username })
      .then(res => {
        const { message } = res.data
        return (message) ? this.setState({ errorMessage: message }) : redirect(res.data)
      })
      .catch(err => console.log(err))
  };
 
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

              {this.state.mobile ? 
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

              {(this.state.errorMessage) ? 
                  <button className="error-message">{this.state.errorMessage}</button> : null
                }

              {this.state.mobile ? 
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