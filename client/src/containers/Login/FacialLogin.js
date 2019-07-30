import React from 'react';
import axios from 'axios'
import Webcam from 'react-webcam'

class FacialLogin extends React.Component {
  state = {
    errorMessage: ''
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
        <div>
          
          <Webcam
            audio={false}
            height={350}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
          />
          <button onClick={this.capture}>Capture photo</button>

          {(this.state.errorMessage) ? 
            <div>{this.state.errorMessage}</div> : null
          }

        </div>
      )
    }
  }

export default FacialLogin