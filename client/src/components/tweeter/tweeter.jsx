import React, { Component } from 'react';
import './style.css';

class Tweeter extends Component {
  render() {
    return (
      <div className="tweeter-container container-fluid rounded p-3 my-2 text-right bg-blue-light border border-primary">
        <textarea className="container"></textarea>
        <button className="btn btn-primary">Tweet</button>
      </div>
    );
  }
}

export default Tweeter;
