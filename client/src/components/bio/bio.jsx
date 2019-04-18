import React, { Component } from 'react';
import './style.css';

class Bio extends Component {
  render() {
    return (
      <div id="bio-container" className="col-md-3">
        <img id="portrait" className="img-thumbnail" src="https://images.pexels.com/photos/2044231/pexels-photo-2044231.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
        <h5 className="font-weight-bold">First Last</h5>
        <p className="text-secondary">@username</p>
        <p className="my-2">Hello world!</p>
        <p className="text-secondary">Joined: April 17, 2019</p>
      </div>
    );
  }
}

export default Bio;
