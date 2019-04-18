import React, { Component } from 'react';
import Tweeter from '../tweeter/tweeter';
import Tweet from '../tweet/tweet';
import './style.css';

class DashboardFeed extends Component {
  render() {
    let feed = this.props.data.feed.map((tweet, key) => <Tweet key={tweet.id + key} data={tweet}/>);

    return (
      <div className="col-md-9">
        <Tweeter />
        {feed}
      </div>
    );
  }
}

export default DashboardFeed;
