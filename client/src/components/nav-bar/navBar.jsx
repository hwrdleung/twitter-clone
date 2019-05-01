import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import LoginForm from '../login-form/loginForm';
import { logout, setCurrentView, getProfileData } from '../../state/actions/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  logout: (token) => dispatch(logout(token)),
  setCurrentView: (view, isDashboard) => dispatch(setCurrentView(view, isDashboard)),
  getProfileData: (username, token) => dispatch(getProfileData(username, token))

});


class NavBar extends Component {
  logOutHandler = () => {
    let token = sessionStorage.getItem('twitterCloneToken');
    this.props.logout(token).then(res => {

    }).catch(error => console.log(error));

  }

  componentDidUpdate(prevProps) {
    this.autoRouteHandler(prevProps);
  }

  autoRouteHandler = (prevProps) => {
    // This function handles auto-routing and resetting of views throughout the entire app based on changes to the state.
    let currentView = this.props.history.location.pathname.split('/')[1];

    switch (currentView) {
      case '':
        // If user logs in, route to dashboard
        if (!prevProps.user.isLoggedIn && this.props.user.isLoggedIn) this.props.history.push('/dashboard');
        break;

      case 'login':
        // If user logs in, route to dashboard
        if (!prevProps.user.isLoggedIn && this.props.user.isLoggedIn) this.props.history.push('/dashboard');
        break;

      case 'registration':
        // If user logs in, route to dashboard
        if (!prevProps.user.isLoggedIn && this.props.user.isLoggedIn) this.props.history.push('/dashboard');
        break;

      case 'dashboard':
        // If user logs out, route to /
        if (!this.props.user.isLoggedIn) this.props.history.push('/');
        break;

      case 'profile':
        let previousUsername = prevProps.location.pathname.split('/')[2];
        let username = this.props.location.pathname.split('/')[2];
        let token = sessionStorage.getItem('twitterCloneToken');

        // If user logs out, route to /
        if (prevProps.user.isLoggedIn && !this.props.user.isLoggedIn) this.props.history.push('/');

        // If user logs in, refresh data
        if (!prevProps.user.isLoggedIn && this.props.user.isLoggedIn) this.props.getProfileData(username, token).catch(error => console.log(error));

        // If user goes from one profile to another, reset profile current view to 'tweets' and refresh profile data
        if (previousUsername !== username) {
          this.props.getProfileData(username, token).catch(error => console.log(error));
          this.props.setCurrentView('TWEETS', false);
        }

        break;

      case 'settings':
        // If user logs out, route to /
        if (prevProps.user.isLoggedIn && !this.props.user.isLoggedIn) this.props.history.push('/');
        break;
      default:
        break;
    }
  }

  getProfileUrl = () => {
    if (this.props.user) {
      return `/profile/${this.props.data.username}`;
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light shadow">
        <NavLink to={this.props.user.isLoggedIn ? '/dashboard' : '/'} className="navbar-brand">
          <FontAwesomeIcon className="fa-icon-link text-silver icon-md" size="1x" icon={['fas', 'dove']} />
        </NavLink>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navBarMenu"><span className="navbar-toggler-icon"></span></button>

        {this.props.user.isLoggedIn ? (
          <div id="navBarMenu" className="collapse navbar-collapse">
            <div className="navbar-nav ml-auto">
              <div data-toggle="collapse" data-target=".navbar-collapse" className="ml-auto"><NavLink to="/dashboard" className="nav-item nav-link">Dashboard</NavLink></div>
              <div data-toggle="collapse" data-target=".navbar-collapse" className="ml-auto"><NavLink to="/settings" className="nav-item nav-link">Settings</NavLink></div>
              <div data-toggle="collapse" data-target=".navbar-collapse" className="ml-auto"><NavLink to={this.getProfileUrl()} className="nav-item nav-link">{this.props.data.username}</NavLink></div>
              <div data-toggle="collapse" data-target=".navbar-collapse" className="ml-auto"><p className="nav-item clickable nav-link m-0" onClick={this.logOutHandler}>Log out</p></div>
            </div>
          </div>
        ) : (<div id="navBarMenu" className="ml-auto collapse navbar-collapse justify-content-end"><LoginForm /></div>)}
      </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
