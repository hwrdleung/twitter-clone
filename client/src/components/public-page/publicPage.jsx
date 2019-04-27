import React, { Component } from 'react';
import Header from '../header/header'
import PublicFeed from '../public-feed/publicFeed'
import Bio from '../bio/bio';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Followers from '../followers/followers';
import Following from '../following/following';
import { getProfileData, follow } from '../../state/actions/action';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getProfileData: (username) => dispatch(getProfileData(username)),
  follow: (data, token) => dispatch(follow(data, token))
});


class PublicPage extends Component {
  componentWillMount() {
    let username = this.getUsernameFromPath(this.props.history.location.pathname);
    this.refreshProfileData(username);

    this.unlisten = this.props.history.listen((location) => {
      let username = this.getUsernameFromPath(location.pathname);
      this.refreshProfileData(username);
    });
  }

  componentWillReceiveProps(newProps) {
    // Route to home if user logs in
    // if(newProps.user.isLoggedIn && !this.props.user.isLoggedIn) this.props.history.push('/dashboard')
  }

  getUsernameFromPath(path) {
    let pathArr = path.split('/')
    if (pathArr[1] === 'profile') return pathArr[2];
  }

  componentWillUnmount() {
    this.unlisten();
  }

  refreshProfileData(username) {
    this.props.getProfileData(username).catch(error => console.log(error));
  }

  renderFollowBtn = () => {
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

      // if (user.outgoingFollowRequests.includes(profile.username)) {
      //   return <button className="btn btn-block btn-primary">Cancel follow request</button>
      // } else if (user.following.includes(profile.username)) {
      //   return <button className="btn btn-block btn-primary" onClick={this.handleFollowBtn}>Unfollow</button>
      // } else {
      //   return <button className="btn btn-block btn-primary" onClick={this.handleFollowBtn}>Follow</button>
      // }

      return <button className="btn btn-block btn-primary" onClick={this.handleFollowBtn}>{btnText}</button>

    } else {
      return null;
    }
    // let user = this.props.user;
    // let profile = this.props.profile;

    // if (user.isLoggedIn && user.username !== profile.username) {
    //   let isPending = this.props.user.outgoingFollowRequests.includes(profile.username);

    //   if (isPending) {
    //     return <div className="bg-primary text-light text-center small rounded py-2">Requested to follow</div>
    //   } else if (!isPending) {
    //     let isFollower = profile.followers.includes(user.username);
    //     let btnText = isFollower ? 'Unfollow' : 'Follow';

    //     return <button className="btn btn-primary" onClick={this.handleFollowBtn}>{btnText}</button>
    //   }
    // }
  }

  handleFollowBtn = () => {
    let token = sessionStorage.getItem('twitterCloneToken');
    let data = {
      profileId: this.props.profile._id
    }

    this.props.follow(data, token).then(res => {
      console.log(res);
    })
  }

  renderComponentBody() {
    switch (this.props.profile.currentView) {
      case 'TWEETS':
        return <PublicFeed data={this.props.profile} />
        break;
      case 'FOLLOWERS':
        return <Followers data={this.props.profile.followers} isDashboard={false} />
        break;
      case 'FOLLOWING':
        return <Following data={this.props.profile.following} isDashboard={false} />
        break;
    }
  }

  render() {
    return (
      <div className="pb-5">
        <Header data={this.props.profile} isDashboard={false} />
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-3 mb-2 mr-2">
              <Bio data={this.props.profile} />
              {this.renderFollowBtn()}
            </div>

            <div className="col-sm-7 mb-2 mr-2">
              {this.renderComponentBody()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PublicPage));
