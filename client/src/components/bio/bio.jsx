import React, { Component } from 'react';
import { getFormattedDate } from '../../helpers';
import { connect } from 'react-redux';
import './style.css';

const mapStateToProps = state => ({
  ...state
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

  renderChangePhotoBtn = () => {
    if (this.props.isDashboard) return <button className="btn btn-primary btn-block my-2 ml-auto">Choose a new Photo</button>
  }

  render() {
    return (
      <div className="d-flex flex-row flex-wrap">
        <div id="portrait-container" className="mb-2 mr-3">
          <img className="img-thumbnail" src={this.props.data.profileImgUrl} />
        </div>

        <div>
          {this.renderName()}
          {this.renderUsername()}
          {this.renderEmail()}
          {this.renderLocation()}
          {this.renderBio()}
          <p className="text-secondary">Joined: {getFormattedDate(this.props.data.dateJoined)}</p>
          {this.renderChangePhotoBtn()}
        </div>
      </div >
    );
  }
}

export default connect(mapStateToProps)(Bio);
