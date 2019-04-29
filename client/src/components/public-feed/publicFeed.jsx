import React, { Component } from 'react';
import Tweet from '../tweet/tweet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({

});

class PublicFeed extends Component {
  renderFeed() {
    // Server will check if the viewer has access to this profile.
    // hiddentTweets = true if access is denied.
    if (this.props.profile.hiddenTweets) {
      return <div className="container-fluid">
        <p className="text-center small font-italic my-5 text-secondary">This profile is private.</p></div>
    } else if (this.props.profile.tweets.length === 0) {
      return <div className="container-fluid">
        <p className="text-center small font-italic my-5 text-secondary">{this.props.profile.username} has no tweets.</p></div>
    } else {
      let tweets = this.props.profile.tweets;

      if (tweets.length) {
        return tweets.map((tweet) => <Tweet data={tweet} />);
      }
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

export default connect(mapStateToProps, mapDispatchToProps)(PublicFeed);
