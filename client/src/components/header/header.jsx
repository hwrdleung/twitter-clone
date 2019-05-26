import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentView, getUserData } from '../../state/actions/action';
import { Badge } from 'react-bootstrap';
import { getBackgroundImgCss } from '../../helpers';
import ImageUploader from '../image-uploader/imageUploader';
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
    if (this.props.isDashboard && number > 0) return <Badge className="quantity-badge" variant="danger">{number}</Badge>
  }

  renderMessagesStat = () => {
    if (this.props.isDashboard) {
      return (
        <ul onClick={() => this.tabClickHandler('MESSAGES')} className={this.getTabClassName()}>
          <li><p style={{position: "relative"}} className="my-0 mx-auto">{this.renderQuantityBadge(this.props.stats.newMessages)}Messages</p></li>
          <li className="font-weight-bold">{this.props.stats.messages}</li>
        </ul>
      )
    }
  }

  getSplashImgUrl = () => {
    // First, check for selected image.  Selected image would be preset if user is changing photo.
    if(this.props.isDashboard){
      if(this.props.user.selectedFileBase64SplashImg) {
        return this.props.user.selectedFileBase64SplashImg;
      }

      // Default: return splashImgUrl
      return this.props.isDashboard ? this.props.user.splashImgUrl : this.props.profile.splashImgUrl;
    }
  }
  
  render() {
    return (
      <div style={{ maxWidth: '100vw' }}>
        <div id="splash-container" className="overflow-hidden d-flex flex-row pb-2 justify-content-center align-items-end" style={getBackgroundImgCss(this.getSplashImgUrl())}>
        {this.props.isDashboard ? <ImageUploader type="SPLASH"/> : null}
        </div>

        <div id="tab-container" className="bg-light shadow-sm my-0 p-0 d-flex flex-row flex-wrap justify-content-center align-items center">
          <ul onClick={() => this.tabClickHandler('TWEETS')} className={this.getTabClassName()}>
            <li><p style={{position: "relative"}} className="my-0 mx-auto">Tweets</p></li>
            <li className="font-weight-bold">{this.props.stats.tweets}</li>
          </ul>

          {this.renderMessagesStat()}

          <ul onClick={() => this.tabClickHandler('FOLLOWING')} className={this.getTabClassName()}>
            <li><p style={{position: "relative"}} className="my-0 mx-auto">Following</p></li>
            <li className="font-weight-bold">{this.props.stats.following}</li>
          </ul>

          <ul onClick={() => this.tabClickHandler('FOLLOWERS')} className={this.getTabClassName()}>
            <li><p style={{position: "relative"}} className="my-0 mx-auto">{this.renderQuantityBadge(this.props.stats.newFollowRequests)}Followers</p></li>
            <li className="font-weight-bold">{this.props.stats.followers}</li>
          </ul>

          <ul className={this.getTabClassName()}>
            <li><p style={{position: "relative"}} className="my-0 mx-auto">Likes</p></li>
            <li className="font-weight-bold">{this.props.stats.likes}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
