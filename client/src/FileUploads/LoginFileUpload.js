import React from 'react';

class LoginFileUpload extends React.Component {

  // Converts image file into base64 string and passes base64 string back to the FacialLogin component
  handleUpload = e => {
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadInput.files[0])
    reader.onload = () => {
      this.props.exportFile(reader.result)
    }
    reader.onerror = err => {
      console.log(err)
    }
  }
  
  render() {
    return (
      <div>
        <center>

          <label 
            htmlFor="file"
            className="auth-button file-choice"
            >Choose a file</label>

          <input 
            ref={(ref) => { this.uploadInput = ref; }}  // assigns file to function for handleUpload function to access
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
export default LoginFileUpload;