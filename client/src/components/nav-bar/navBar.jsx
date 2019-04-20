import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import LoginForm from '../login-form/loginForm';
import { logout } from '../../state/actions/action';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  logout: (data) => dispatch(logout(data)),
});


class NavBar extends Component {
  constructor(){
    super();

  }

  signOutHandler = () => {
    sessionStorage.removeItem('twitterCloneToken');
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    const userProfileUrl = `/profile/${this.props.data.username}`;
    let isLoggedIn = sessionStorage.getItem('twitterCloneToken') ? true : false;

    return (
      <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light shadow">
        <NavLink to={this.props.data.username ? '/dashboard' : '/'} className="navbar-brand">Home</NavLink>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navBarMenu"><span className="navbar-toggler-icon"></span></button>

      {isLoggedIn ? ( 
        <div id="navBarMenu" className="collapse navbar-collapse">
          <div className="navbar-nav ml-auto">
            <NavLink to="/dashboard" className="nav-item nav-link ml-auto">Dashboard</NavLink>
            <NavLink to="/settings" className="nav-item nav-link ml-auto">Settings</NavLink>
            <NavLink to={userProfileUrl} className="nav-item nav-link ml-auto">{this.props.data.username}</NavLink>
            <a className="nav-item nav-link ml-auto" onClick={this.signOutHandler}>Sign out</a>
          </div>
        </div>
      ) : (<div className="ml-auto"><LoginForm /></div>)}
      </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
