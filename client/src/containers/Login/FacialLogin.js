import React from 'react';
import axios from 'axios'
import Webcam from 'react-webcam'
import SigninFileUpload from './../../components/SigninFileUpload'


class FacialLogin extends React.Component {
  state = {
    errorMessage: ''  
  }

  importUploadedFile = file => {
    // const username = window.location.href.split('/').reverse()[0]
    const username = window.location.href.split('/').reverse()[0]
    console.log("File: " + file)
    axios.post("/api/auth/faciallogin", { username: username, image: file })
      .then(res => this.props.setUser(res.data))
      .catch(err => console.log(err))
  }


  setRef = webcam => {
    this.webcam = webcam;
  };
 
  capture = () => {
    const username = window.location.href.split('/').reverse()[0]
    const imageSrc = this.webcam.getScreenshot()


    axios.post(`/api/auth/faciallogin`, { image: imageSrc, username })
      .then(res => {
        const { message } = res.data
        return (message) ? this.setState({ errorMessage: message }) : this.props.setUser(res.data)
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
          
          <h1>Facial Login</h1>
          <hr className="title-hr"/>

          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <button 
            className="auth-button"
            onClick={this.capture}>
              Capture photo</button>

          {(this.state.errorMessage) ? 
            <button className="error-message">{this.state.errorMessage}</button> : null
          }

          <SigninFileUpload
            exportFile={this.importUploadedFile}
            />

        </div>
      )
    }
  }

export default FacialLogin