import React, { Component } from 'react';
import Header from '../header/header'
import PublicFeed from '../public-feed/publicFeed'
import Bio from '../bio/bio';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Followers from '../followers/followers';
import Following from '../following/following';
import { getProfileData, follow } from '../../state/actions/action';
import { getUsernameFromPath } from '../../helpers';
import './style.css';
import { Spinner } from 'react-bootstrap';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getProfileData: (username, token) => dispatch(getProfileData(username, token)),
  follow: (data, token) => dispatch(follow(data, token))
});

class PublicPage extends Component {
  constructor() {
    super();
    this.state = {
      isFollowLoading: false,
    }
  }
  // On load, get the username from the URL path and fetch profile data via actions
  componentWillMount() {
    let username = getUsernameFromPath(this.props.history.location.pathname);
    this.refreshProfileData(username);

    this.unlisten = this.props.history.listen((location) => {
      let username = getUsernameFromPath(location.pathname);
      this.refreshProfileData(username);
    });
  }

  componentWillReceiveProps(newProps) {
    // If user logs in while on public profile page, refresh data
    if (!this.props.user.isLoggedIn && newProps.user.isLoggedIn) this.refreshProfileData(newProps.profile.username);
  }

  componentWillUnmount() {
    this.unlisten();
  }

  refreshProfileData(username) {
    let token = sessionStorage.getItem('twitterCloneToken');
    this.props.getProfileData(username, token).catch(error => console.log(error));
  }

  renderFollowBtn = () => {
    if (this.state.isFollowLoading) return this.renderLoader();

    let user = this.props.user;
    let profile = this.props.profile;
    let btnText = '';

    if (user.isLoggedIn && user.username !== profile.username) {
      if (user.outgoingFollowRequests.includes(profile.username)) {
        btnText = 'Cancel follow request';
      } else if (user.following.includes(profile.username)) {
        btnText = 'Unfollow';
      } else {
        btnText = 'Follow';
      }

      return <button className="btn btn-block btn-primary" onClick={this.handleFollowBtn}>{btnText}</button>

    } else {
      return null;
    }
  }

  handleFollowBtn = () => {
    this.setState({ isFollowLoading: true })
    let token = sessionStorage.getItem('twitterCloneToken');
    let data = {
      profileId: this.props.profile._id
    }

    this.props.follow(data, token).then(res => {
      this.setState({ isFollowLoading: false });
    }).catch(error => console.log(error));
  }

  renderComponentBody() {
    switch (this.props.profile.currentView) {
      case 'TWEETS':
        return <PublicFeed />
      case 'FOLLOWERS':
        return <Followers isDashboard={false} />
      case 'FOLLOWING':
        return <Following isDashboard={false} />
      default:
        return null;
    }
  }

  renderLoader = () => {
    return <div className="text-center my-5 py-5"><Spinner
      variant="primary"
      animation="border"
      size="sm"
      role="status"
    /></div>
  }

  render() {
    return (
      <div className="pb-5">
        <Header
          stats={this.props.profile.stats}
          splashImgUrl={this.props.profile.splashImgUrl}
          isDashboard={false} />

        {this.props.profile.username === null ? this.renderLoader() :
          <div className="container py-5">
            <div className="row">
              <div className="col-sm-3 mb-5 mr-2">
                <Bio data={this.props.profile} />
                {this.renderFollowBtn()}
              </div>

              <div className="col-sm-7 mb-2 mr-2">
                {this.renderComponentBody()}
              </div>
            </div>
          </div>}

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PublicPage));
