import React, { Component } from 'react';
import axios from 'axios';

class FileUpload extends Component {
   state = {
      success : false,
      url : ""
    }

  // Perform the upload
  handleUpload = e => {
    if (!this.props.username.length) return this.props.errorMessage("Please fill in username")

    let file = this.uploadInput.files[0] || this.props.capturedImage

    let fileParts = file.name.split('.')
    let fileName = fileParts[0];
    let fileType = fileParts[1];

    axios.post("/api/sign_s3",{
      fileName,
      fileType
    })
    .then(response => {
      const returnData = response.data.data.returnData;
      const signedRequest = returnData.signedRequest;
      const url = returnData.url;
      this.setState({ url })
      
     const options = { headers: { "Content-Type": fileType, "x-amz-acl": "public-read" } };
      axios.put(signedRequest, file, options)
      .then(result => {
        this.setState({ success: true });
        axios.post('/api/auth/facialsignup', { 
          username: this.props.username,
          profileImg: `https://project3profileimages.s3.us-east-2.amazonaws.com/${fileName}` 
        })
        .then(res => {
          return (res.data.message) ? 
            this.props.redirect(false, res.data.message) :
            this.props.redirect(true, res.data)

        })
      })
    })
    .catch(error => {
      console.log(JSON.stringify(error));
    })
  }
  
  
  render() {

    return (
      <div>
        <center>

          <label 
            htmlFor="file"
            className="auth-button file-choice">
            Choose a file
            </label>

          <input 
            ref={(ref) => { this.uploadInput = ref; }} 
            type="file"
            name="file"
            className="input-file"
            id="file"
            />

          <br/>

          <button 
            className="auth-button login-button"
            onClick={this.handleUpload}>Submit
            </button>

        </center>
      </div>
    );
  }
}
export default FileUpload;