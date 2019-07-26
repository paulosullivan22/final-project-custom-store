import React from 'react';
import AWS from 'aws-sdk';
import Webcam from 'react-webcam'
import Clarifai from 'clarifai';

class test extends React.Component {

  setRef = webcam => {
    this.webcam = webcam;
  };
 
  capture = () => {
    const imageSrc = this.webcam.getScreenshot()

    var params = {
      SimilarityThreshold: 90, 
      SourceImage: {
        Bytes: Buffer.from(imageSrc.replace(/^data:image\/\w+;base64,/, ""), 'base64')
      }, 
      TargetImage: {
       S3Object: {
        Bucket: "project3profileimages", 
        Name: "profile_picture.jpg"
       }
      }
     };

    
     // pass to backend
    let rekognition = new AWS.Rekognition({ 
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
      region: 'us-east-2'
    })

    rekognition.compareFaces(params, (err, data) => {
      if (err) console.log('Error comparing faces: ' + err)
      else console.log(data)
      
      const app = new Clarifai.App({
        apiKey: process.env.clarifaiApiKey
       });


      app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", {base64: imageSrc.replace(/^data:image\/\w+;base64,/, "")}).then(
        function(response) {
          console.log(response)
        },
        function(err) {
          console.log(err)
        }
      );
    });


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

        </div>
      )
    }
  }

export default test