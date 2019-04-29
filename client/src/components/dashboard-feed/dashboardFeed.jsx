import React, { Component } from 'react';
import Tweeter from '../tweeter/tweeter';
import Tweet from '../tweet/tweet';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

class DashboardFeed extends Component {
  renderFeed() {
    // TODO: SET UP THE /getFeed ENDPOINT IN THE SERVER AND HOOK IT UP TO THIS COMPONENT
    let tweets = this.props.user.tweets.slice().reverse()
    if (tweets.length) {
      return tweets.map((tweet) => <Tweet isDashboard={true} key={tweet._id} data={tweet} />);
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

export default connect(mapStateToProps)(DashboardFeed);
