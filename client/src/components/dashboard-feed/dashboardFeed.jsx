import React, { Component } from 'react';
import Tweeter from '../tweeter/tweeter';
import Tweet from '../tweet/tweet';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFeed } from '../../state/actions/action';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getFeed: (token) => dispatch(getFeed(token))
});


class DashboardFeed extends Component {
  // This component renders a list of tweets for use in the dashboard page.

  componentWillMount() {
    // Fetch feed data from server
    let token = sessionStorage.getItem('twitterCloneToken');
    if (this.props.user.following.length > 0) {
      this.props.getFeed(token).catch(error => console.log(error));
    }
  }

  renderFeed = () => {
    if (this.props.user.feed.length === 0) return <p className="font-italic text-secondary">No feed.</p>;

    let feed = this.props.user.feed.slice().reverse();
    return feed.map(tweet => <Tweet isDashboard={true} data={tweet} key={tweet._id} />);
  }

  render() {
    return (
      <React.Fragment>
        <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />
        <h5>Feed:</h5>
        <div className="shadow mb-3 p-4 bg-light"><Tweeter /></div>
        {this.renderFeed()}
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardFeed);
