import React from 'react';
import FileUpload from './FileUpload';
import Webcam from 'react-webcam'

class FacialSignup extends React.Component {
  state = {
    image: '',
    username: '',
    errorMessage: '',
    uploadImg: ''
  }

  handleChange = e => {
    this.setState({
      username: e.target.value
    }, () => console.log(this.state))
  }

  errorMessage = message => {
    this.setState({
      errorMessage: message
    })
  }

  redirect = bool => {
    if (bool) this.props.history.push('/')
    else this.setState({ errorMessage: "This username is already taken" })
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

    fetch(image)
    .then(res => res.blob())
    .then(blob => {
      const fd = new FormData()
      blob.lastModifiedDate = new Date()
      blob.name = `${username}-profile-image`

      fd.append('image', blob, 'name')

      console.log(blob)

      this.setState({
        uploadImg: blob
      })

      console.log(this.state)
    
    })

    this.setState({ image, uploadImg }, () => console.log(this.state))
  }

  render() {

    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    }

    return (
      <div>

        <label htmlFor="username">Username: </label>
        <input type='text' name='username' onChange={this.handleChange} />
          
        {(this.state.image.length) ? 
          (<img src={this.state.image} width="350px" alt="profile" />) : 
          (
          <>
            <Webcam
              audio={false}
              height={350}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={350}
              videoConstraints={videoConstraints}
            />
            <button onClick={this.capture}>Capture photo</button>
          </>
          )
        }

        <h1>OR</h1> 

        <FileUpload 
          username={this.state.username} 
          capturedImage={this.state.uploadImg}
          errorMessage={this.errorMessage}
          redirect={this.redirect}
          setUser={this.props.setUser}
          />

        {(this.state.errorMessage.length) ? 
          <div>{this.state.errorMessage}</div> :
          null
        }

      </div>
    )
  }
}

export default FacialSignup