import React, { Component } from 'react';
import './style.css';

class Bio extends Component {
  render() {
    return (
      <div id="bio-container" className="col-md-3">
        <img id="portrait" className="img-thumbnail" src="https://images.pexels.com/photos/2044231/pexels-photo-2044231.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
        <h5 className="font-weight-bold">{this.props.data.firstName}, {this.props.data.lastName}</h5>
        <p className="text-secondary">@{this.props.data.username}</p>
        <p className="my-2">{this.props.data.bio}</p>
        <p className="text-secondary">Joined: {this.props.data.dateJoined}</p>
      </div>
    );
  }
}

export default Bio;
