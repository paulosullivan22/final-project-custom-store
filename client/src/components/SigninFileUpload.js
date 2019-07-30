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

    this.props.exportFile(file)
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