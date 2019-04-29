import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentView, getUserData } from '../../state/actions/action';
import { Badge } from 'react-bootstrap';
import { getBackgroundImgCss } from '../../helpers';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setCurrentView: (view, isUser) => dispatch(setCurrentView(view, isUser)),
  getUserData: (token) => dispatch(getUserData(token))
});

class Header extends Component {


  tabClickHandler = (view) => {
    let viewOptions = ['TWEETS', 'FOLLOWING', 'FOLLOWERS', 'MESSAGES'];

    if (viewOptions.includes(view)) {
      this.props.getUserData(sessionStorage.getItem('twitterCloneToken'));
      this.props.setCurrentView(view, this.props.isDashboard);
    }
  }

  getTabClassName = () => {
    return `header-btn stat-box list-unstyled px-2 py-3 m-0 text-center d-flex flex-column align-items-center justify-content-center`;
  }

  renderQuantityBadge = (number) => {
    if (this.props.isDashboard && number > 0) {
      return <Badge variant="danger">{number}</Badge>
    }
  }

  renderChangeSplashImgBtn = () => {
    if (this.props.isDashboard) return <div><button className="btn btn-primary shadow">Choose a new photo</button></div>
  }


  renderMessagesStat = () => {
    if (this.props.isDashboard) {
      return (
        <ul onClick={() => this.tabClickHandler('MESSAGES')} className={this.getTabClassName()}>
          <li><p className="my-0 mx-auto">Messages{this.renderQuantityBadge(this.props.stats.newMessages)}</p></li>
          <li className="font-weight-bold">{this.props.stats.messages}</li>
        </ul>
      )
    }
  }
  
  debug = () => {
    console.log(this.props);
  }

  render() {
    return (
      <div style={{ maxWidth: '100vw' }}>
        <div id="splash-container" onClick={this.debug} className="overflow-hidden d-flex flex-row pb-2 justify-content-center align-items-end" style={getBackgroundImgCss(this.props.splashImgUrl)}>
          {this.renderChangeSplashImgBtn()}
        </div>

        <div id="tab-container" className="bg-light shadow-sm my-0 p-0 d-flex flex-row flex-wrap justify-content-center align-items center">
          <ul onClick={() => this.tabClickHandler('TWEETS')} className={this.getTabClassName()}>
            <li><p className="my-0 mx-auto">Tweets</p></li>
            <li className="font-weight-bold">{this.props.stats.tweets}</li>
          </ul>

          {this.renderMessagesStat()}

          <ul onClick={() => this.tabClickHandler('FOLLOWING')} className={this.getTabClassName()}>
            <li><p className="my-0 mx-auto">Following</p></li>
            <li className="font-weight-bold">{this.props.stats.following}</li>
          </ul>

          <ul onClick={() => this.tabClickHandler('FOLLOWERS')} className={this.getTabClassName()}>
            <li><p className="my-0 mx-auto">Followers{this.renderQuantityBadge(this.props.stats.newFollowRequests)}</p></li>
            <li className="font-weight-bold">{this.props.stats.followers}</li>
          </ul>

          <ul className={this.getTabClassName()}>
            <li><p className="my-0 mx-auto">Likes</p></li>
            <li className="font-weight-bold">{this.props.stats.likes}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
