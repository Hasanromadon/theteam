import React, { Component } from 'react';
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { CircularProgress } from '@material-ui/core';

class Fileuploader extends Component {
  state = {
    name: '',
    isUploading: false,
    fileURL: '',
  };

  handleUploadStart = () => {
    this.setState({
      isUploading: true,
    });
  };

  handleUploadError = (e) => {
    console.log(e);
    this.setState({
      isUploading: false,
    });
  };

  handleUploadSuccess = (filename) => {
    this.setState({
      name: filename,
      isUploading: false,
    });
    // get image url from storage
    firebase
      .storage()
      .ref(this.props.dir)
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({
          fileURL: url,
        });
      });

    this.props.filename(this.state.name);

    // update filename ke parents *add edit players*
  };

  // cek props atau state sebelum dirender dan bisa modify props / render
  static getDerivedStateFromProps(props, state) {
    if (props.defaultImg) {
      return (state = {
        name: props.ImgName,
        fileURL: props.defaultImg,
      });
    }
    return null;
  }

  // DELETE IMAGE
  uploadAgain = () => {
    this.setState({
      name: '',
      isUploading: false,
      fileURL: '',
    });

    this.props.resetImage();
  };

  render() {
    return (
      <div>
        {!this.state.fileURL ? (
          <div>
            <FileUploader
              accept="image/*"
              name="image"
              randomizeFilename
              storageRef={firebase.storage().ref(this.props.dir)}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
            />
          </div>
        ) : (
          <div className="image_upload_container">
            <img
              src={this.state.fileURL}
              alt={this.state.name}
              style={{ width: '100%' }}
            />
            <div
              className="remove"
              onClick={() => {
                this.uploadAgain();
              }}
            >
              Remove
            </div>
          </div>
        )}

        {this.state.isUploading ? (
          <div
            className="progress"
            style={{ textAlign: 'center', margin: '30px 0' }}
          >
            <CircularProgress style={{ color: 'rosybrown' }} thickness={4} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Fileuploader;
