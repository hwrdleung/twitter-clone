import React, { Component } from 'react';
import './style.css';

class Tweeter extends Component {
  render() {
    return (
      <div className="tweeter-container container-fluid p-3 mb-3 text-right bg-blue-light border border-light bg-light shadow">
        <textarea className="container"></textarea>
        <button className="btn btn-primary">Tweet</button>
      </div>
    );
  }
}

export default Tweeter;
