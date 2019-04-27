import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentView, getUserData } from '../../state/actions/action';
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

  renderMessagesStat = () => {
    if (this.props.isDashboard) {
      return (
        <ul onClick={this.messagesClickHandler} className={this.getTabClassName()}>
          <li><p className="my-0 mx-auto">Messages</p></li>
          <li className="font-weight-bold">{this.props.user.stats.messages}</li>
        </ul>
      )
    }
  }

  render() {
    return (
      <div style={{ maxWidth: '100vw' }}>
        <div id="splash-container" className="overflow-hidden" style={{ backgroundImage: "url('https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg')" }}>
          {/* <img className="mx-auto p-0" src="https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg" /> */}
        </div>

        <div id="tab-container" className="bg-light shadow-sm my-0 p-0 d-flex flex-row flex-wrap justify-content-center align-items center">
          <ul onClick={() => this.tabClickHandler('TWEETS')} className={this.getTabClassName()}>
            <li><p className="my-0 mx-auto">Tweets</p></li>
            <li className="font-weight-bold">{this.props.data.stats.tweets}</li>
          </ul>

          {this.renderMessagesStat()}

          <ul onClick={() => this.tabClickHandler('FOLLOWING')} className={this.getTabClassName()}>
            <li><p className="my-0 mx-auto">Following</p></li>
            <li className="font-weight-bold">{this.props.data.stats.following}</li>
          </ul>

          <ul onClick={() => this.tabClickHandler('FOLLOWERS')} className={this.getTabClassName()}>
            <li><p className="my-0 mx-auto">Followers</p></li>
            <li className="font-weight-bold">{this.props.data.stats.followers}</li>
          </ul>

          <ul className={this.getTabClassName()}>
            <li><p className="my-0 mx-auto">Likes</p></li>
            <li className="font-weight-bold">{this.props.data.stats.likes}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
