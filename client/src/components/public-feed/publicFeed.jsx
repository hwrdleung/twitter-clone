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
    if (!this.props.data.isPrivate ||
      this.props.data.username === this.props.user.username ||
      (this.props.data.isPrivate && this.props.data.followers.includes(this.props.user.username))) {
      let tweets = this.props.data.tweets;

      if (tweets.length) {
        return tweets.map((tweet) => <Tweet key={tweet._id} data={tweet} />);
      } else {
        return (<p className="text-center small font-italic my-5 text-secondary">{this.props.data.username} hasn't posted any tweets.</p>)
      }
    } else {
      return (<p className="text-center small font-italic my-5 text-secondary">This profile is private.</p>)
    }

  }

  renderTweets() {

  }

  componentDidMount() {
    console.log(this.props.data)
  }

  componentWillReceiveProps(props) {
    console.log(props)
  }

  // <p className="small text-center mx-auto font-italic text-secondary">This profile is private.</p> :


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
