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
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    console.log(this.uploadInput.files[0])
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log(`https://project3profileimages.s3.us-east-2.amazonaws.com/${fileName}`)
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
      
     // Put the fileType in the headers for the upload
     var options = { headers: { "Content-Type": fileType, "x-amz-acl": "public-read" } };
      axios.put(signedRequest, file, options)
      .then(result => {
        this.setState({ success: true });
      })
      .catch(error => {
        console.log(error)
        alert("ERROR " + JSON.stringify(error));
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