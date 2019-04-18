import React, { Component } from 'react';
import Tweet from '../tweet/tweet';
import './style.css';

class PublicFeed extends Component {
  render() {
    return (
      <div className="col-md-9">
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

export default PublicFeed;
