import React, { Component } from 'react';
import Tweet from '../tweet/tweet';
import './style.css';

class PublicFeed extends Component {


  render() {
    let feed = this.props.data.tweets.map((tweet, key) => <Tweet key={key + tweet.id} data={tweet} />);

    return (
      <div className="col-md-9">
        {feed}
      </div>

    );
  }
}

export default PublicFeed;
