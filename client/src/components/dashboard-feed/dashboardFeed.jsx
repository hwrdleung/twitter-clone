import React, { Component } from 'react';
import Tweeter from '../tweeter/tweeter';
import Tweet from '../tweet/tweet';
import './style.css';

class DashboardFeed extends Component {
  render() {
    return (
      <div className="col-md-9">
        <Tweeter />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />

      </div>
    );
  }
}

export default DashboardFeed;
