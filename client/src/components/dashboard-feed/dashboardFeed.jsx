import React, { Component } from 'react';
import Tweeter from '../tweeter/tweeter';
import Tweet from '../tweet/tweet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

class DashboardFeed extends Component {

  renderFeed() {
    let tweets = this.props.data.tweets.slice().reverse()
    if (tweets.length) {
      return tweets.map((tweet) => <Tweet isDashboard={true} key={tweet._id} data={tweet} />);
    } else {
      return (<p className="text-center small font-italic my-5 text-secondary">You don't have any tweets yet.</p>)
    }
  }

  render() {

    return (
      <React.Fragment>
        <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />
        <h5>Tweets:</h5>
        <div className="shadow mb-3 p-4 bg-light">
          <Tweeter />
        </div>
        {this.renderFeed()}
      </React.Fragment>
    );
  }
}

export default DashboardFeed;
