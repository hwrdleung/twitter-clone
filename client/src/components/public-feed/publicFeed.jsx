import React, { Component } from 'react';
import Tweet from '../tweet/tweet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

class PublicFeed extends Component {

  renderFeed() {
    let tweets = this.props.data.tweets;

    if (tweets.length) {
      return tweets.map((tweet) => <Tweet key={tweet._id} data={tweet} />);
    } else {
      return (<p className="text-center small font-italic my-5 text-secondary">{this.props.data.username} hasn't posted any tweets.</p>)
    }
  }

  render() {
    return (
      <React.Fragment>
        <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />
        <h5>Tweets:</h5>
        {this.renderFeed()}
      </React.Fragment>
    );
  }
}

export default PublicFeed;
