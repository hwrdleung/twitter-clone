import React, { Component } from 'react';
import { getFormattedDate } from '../../helpers';
import { connect } from 'react-redux';
import ImageUploader from '../image-uploader/imageUploader';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
});


class Bio extends Component {

  renderName = () => {
    let source = this.props.isDashboard ? this.props.user : this.props.profile;
    return <h5 className="font-weight-bold">{source.firstName}, {source.lastName}</h5>
  }

  renderUsername = () => {
    let source = this.props.isDashboard ? this.props.user : this.props.profile;
    return <p className="text-secondary mb-1">@{source.username}</p>
  }

  renderEmail = () => {
    let source = this.props.isDashboard ? this.props.user : this.props.profile;
    if (source.settings.displayLocation) return <p className="m-0">{source.email}</p>
  }

  renderLocation = () => {
    let source = this.props.isDashboard ? this.props.user : this.props.profile;
    if (source.settings.displayLocation) return <p className="m-0">{source.city}, {source.state}</p>
  }

  renderBio = () => {
    let source = this.props.isDashboard ? this.props.user : this.props.profile;
    return <p className="my-3 font-italic">{source.bio}</p>
  }

  renderBirthday = () => {
    let source = this.props.isDashboard ? this.props.user : this.props.profile;
    if(source.settings.displayBirthday) return <p className="my-0 text-secondary">Birthday: {source.birthday}</p>
  }

  getProfileImgSrc = () => {
    if(this.props.isDashboard) {
      if(this.props.user.selectedFileBase64ProfileImg) {
        return this.props.user.selectedFileBase64ProfileImg;
      } else {
        return this.props.user.profileImgUrl;
      }
    } else {
      return this.props.profile.profileImgUrl;
    }
  }

  render() {
    return (
      <div className="d-flex flex-row flex-wrap">
        <div id="portrait-container" className="mb-2 mr-3">
          <img className="img-thumbnail" src={this.getProfileImgSrc()} alt="Profile"/>
          {this.props.isDashboard ? <ImageUploader type="PROFILE"/> : null}

        </div>

        
        <div id="bio-text-container">
          {this.renderName()}
          {this.renderUsername()}
          {this.renderEmail()}
          {this.renderLocation()}
          {this.renderBio()}
          {this.renderBirthday()}
          <p className="my-0 text-secondary">Joined: {getFormattedDate(this.props.data.dateJoined)}</p>

        </div>
      </div >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bio);
