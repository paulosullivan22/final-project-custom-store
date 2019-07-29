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
    // new File([this.props.capturedImage], 'captured-image.jpg')
    // Split the filename to get the name and type
    let fileParts = file.name.split('.')
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
          (res.data.message) ? 
            this.props.redirect(false) : 
            console.log(res.data)
            this.props.setUser(res.data)
            this.props.redirect(true)
        })
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



// import React, { Component } from 'react';
// import axios from 'axios';

// class FileUpload extends Component {
//    state = {
//       username: this.props.username,
//       success : false,
//       url : ""
//     }
  
//   handleChange = (ev) => {
//     this.setState({ success: false, url : "" });
//   }

//   // Perform the upload
//   handleUpload = (ev) => {
//     if (!this.props.username.length) return this.props.errorMessage("Please fill in username")
//     let newFile = new File([this.props.capturedImage], 'captured-image.jpg')
//     let file = this.uploadInput.files[0] || newFile;
//     // Split the filename to get the name and type
//     // console.log(file)
//     let fileParts = this.props.capturedImage.split('.') || file.name.split('.')
//     let fileName = fileParts[0] || "captured-image";
//     let fileType = 'jpg';
//     // console.log(`https://project3profileimages.s3.us-east-2.amazonaws.com/${this.props.username}profile-picture`)
//     axios.post("/api/sign_s3",{
//       fileName,
//       fileType
//     })
//     .then(response => {
//       const returnData = response.data.data.returnData;
//       const signedRequest = returnData.signedRequest;
//       const url = returnData.url;
//       this.setState({ url })
//       console.log("Recieved a signed request " + signedRequest);
      
//      // Put the fileType in the headers for the upload
//      var options = { headers: { "Content-Type": fileType, "x-amz-acl": "public-read" } };
//      console.log(file)
//       axios.put(signedRequest, file, options)
//       .then(result => {
//         this.setState({ success: true });
//         console.log("successful upload", result)
//       })
//       .catch(error => {
//         console.log(error)
//         alert("ERROR " + JSON.stringify(error));
//       })
//     })
//     .catch(error => {
//       console.log('not working here')
//       alert(JSON.stringify(error));
//     })
//   }
  
  
//   render() {

//     return (
//       <div className="App">
//         <center>
//           <h1>UPLOAD A FILE</h1>
//           {this.state.success ? <h3>Success</h3> : null}
//           <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
//           <br/>
//           <button onClick={this.handleUpload}>UPLOAD</button>
//         </center>
//       </div>
//     );
//   }
// }
// export default FileUpload;