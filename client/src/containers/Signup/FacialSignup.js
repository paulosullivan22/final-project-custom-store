import React from 'react';
import SignupFileUpload from '../../FileUploads/SignupFileUpload';
import Webcam from 'react-webcam'

class FacialSignup extends React.Component {
  state = {
    image: '',
    username: '',
    errorMessage: '',
    uploadImg: '',
    mobile: false
  }

  componentDidMount() { // checks if mobile to hide RTC camera as it doesn't function on touchscreen devices
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      this.setState({ mobile: true })
    }
  }

  handleChange = e => {
    this.setState({
      username: e.target.value
    })
  }

  errorMessage = message => { // passed to file upload component to check for errors
    this.setState({
      errorMessage: message
    })
  }

  // NOTE: rename params here
  redirect = (bool, response) => { // called from file upload component if login is successful
    if (bool) {
      this.props.setUser(response)
      this.props.history.push('/user')
    }
    else this.setState({ errorMessage: response }) 
  }

  setRef = webcam => {
    this.webcam = webcam;
  };
 
  capture = () => {
    if (!this.state.username.length) return this.setState({
      errorMessage: "Please enter a username"
    })
    const image = this.webcam.getScreenshot()
    const uploadImg = image.replace(/^data:image\/\w+;base64,/, "") 
    const username = this.state.username

    fetch(image)   // creates blob image from base64 screenshot taken from on-page camera
    .then(res => res.blob())
    .then(blob => {
      const formData = new FormData()
      blob.lastModifiedDate = new Date()
      blob.name = `${username}-profile-image`

      formData.append('image', blob, 'name')

      this.setState({
        uploadImg: blob
      })    
    })

    this.setState({ image, uploadImg })
  }

  render() {

    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    }

    return (
      <div className="facial-auth-container">

        <div className="facial-auth-content facial-signup">

            <h1>Facial Signup</h1>
            <hr className="title-hr"/>

            <p>Please enter a username:</p>
            <input type='text' name='username' onChange={this.handleChange} />

            {(this.state.errorMessage.length) ? 
              <button className="error-message">{this.state.errorMessage}</button> :
              null
            }
              
            {(this.state.image.length) ?  // checks if a photo has been taken, removes webcam if true
              (<img 
                className="captured-photo"
                src={this.state.image} 
                width="350px" 
                alt="profile" />) 
              : 
              (this.state.mobile ? // removes webcam if on mobile - RTC camera isn't compatible with mobile devices
                  null 
                  :
                  <>
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
                      onClick={this.capture}>Capture photo</button>
                  </>
                
              )
            }

            {this.state.mobile ? 
              null 
              :
              <>
                <hr />
                <h4>Or</h4>
                <hr />
              </>
            }

            <SignupFileUpload 
              username={this.state.username} 
              capturedImage={this.state.uploadImg}
              errorMessage={this.errorMessage}
              redirect={this.redirect}
              setUser={this.props.setUser}
              />

        </div>
      </div>
    )
  }
}

export default FacialSignup