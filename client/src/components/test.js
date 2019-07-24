import React from 'react';
import AWS from 'aws-sdk';
import Webcam from 'react-webcam'

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

    let rekognition = new AWS.Rekognition({ 
      accessKeyId: 'AKIA6HEU65DSR5NU27V5',
      secretAccessKey: '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',
      region: 'us-east-2'
    })

    rekognition.compareFaces(params, (err, data) => {
      if (err) console.log('Error comparing faces: ' + err)
      else console.log(data)
      return data
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