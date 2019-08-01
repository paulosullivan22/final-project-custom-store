import React, { Component } from 'react';
import axios from 'axios';

class FileUpload extends Component {
   state = {
      success : false,
      url : ""
    }
  
  handleChange = (ev) => {
    this.setState({ success: false, url : "" });
  }

  // Perform the upload
  handleUpload = (ev) => {
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
      console.log("Recieved a signed request " + signedRequest);
      
     const options = { headers: { "Content-Type": fileType, "x-amz-acl": "public-read" } };
     console.log(file)
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
      alert(JSON.stringify(error));
    })
  }
  
  
  render() {

    return (
      <div className="App">
        <center>
          <h1>UPLOAD A FILE</h1>
          {this.state.success ? <h3>Success</h3> : null}
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload}>UPLOAD</button>
        </center>
      
      </div>
    );
  }
}
export default FileUpload;