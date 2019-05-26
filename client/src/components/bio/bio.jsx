import React, { Component } from 'react';
import { getFormattedDate } from '../../helpers';
import { connect } from 'react-redux';
import ImageUploader from '../image-uploader/imageUploader';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

class Bio extends Component {
  // This component is shared between dashboard page and profile page.

  getSource = () => {
    // This function specifies the appropriate data source for the component based on this.props.isDashboard.
    if (this.props.isDashboard) {
      return this.props.user;
    } else {
      return this.props.profile;
    }
  }

  getProfileImgSrc = () => {
    // First, check for a selected image.  Selected image would be present if user is changing their photo.
    if (this.props.isDashboard) {
      if (this.props.user.selectedFileBase64ProfileImg) {
        return this.props.user.selectedFileBase64ProfileImg;
      }
    }
    // Default: return profileImgUrl
    return this.getSource().profileImgUrl;
  }

  render() {
    return (
      <div className="d-flex flex-row flex-wrap">
        <div id="portrait-container" className="mb-2 mr-3">
          <img className="img-thumbnail" src={this.getProfileImgSrc()} alt="Profile" />
          {this.props.isDashboard ? <ImageUploader type="PROFILE" /> : null}
        </div>

        <div id="bio-text-container">
          <h5 className="font-weight-bold">{this.getSource().firstName} {this.getSource().lastName}</h5>
          <p className="text-secondary mb-1">@{this.getSource().username}</p>
          {this.getSource().settings.displayLocation ? <p className="m-0">{this.getSource().email}</p> : null}
          {this.getSource().settings.displayLocation ? <p className="m-0">{this.getSource().city}, {this.getSource().state}</p> : null}
          <p className="my-3 font-italic">{this.getSource().bio}</p>
          {this.getSource().settings.displayBirthday ? <p className="my-0 text-secondary">Birthday: {this.getSource().birthday}</p> : null}
          <p className="my-0 text-secondary">Joined: {getFormattedDate(this.props.data.dateJoined)}</p>
        </div>
      </div >
    );
  }
}

export default connect(mapStateToProps)(Bio);
