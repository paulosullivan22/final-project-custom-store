import React, { Component } from 'react';

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

    let file = this.uploadInput.files[0] 

    const getBase64 = (file) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        this.props.exportFile(reader.result)
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
   }
   
   getBase64(file);

    
  }
  
  render() {

    return (
      <div className="App">
        <center>
          <hr />
          <h4>Or</h4>
          <hr />
          <label 
            htmlFor="file"
            className="auth-button file-choice"
            >Choose a file</label>
          <input 
            onChange={this.handleChange} 
            ref={(ref) => { this.uploadInput = ref; }} 
            type="file"
            name="file"
            className="input-file"
            id="file"
            />
          <br/>
          <button 
            className="auth-button login-button"
            onClick={this.handleUpload}>Login</button>
        </center>
      
      </div>
    );
  }
}
export default FileUpload;