import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import LoginForm from '../login-form/loginForm';
import { logout } from '../../state/actions/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Navbar, Nav } from 'react-bootstrap';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  logout: (token) => dispatch(logout(token)),
});


class NavBar extends Component {
  logOutHandler = () => {
    let token = sessionStorage.getItem('twitterCloneToken');
    this.props.logout(token).then(res => {
      if (res.success) this.props.history.push('/')
    }).catch(error => console.log(error));

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
              <div data-toggle="collapse" data-target=".navbar-collapse" className="ml-auto"><a className="nav-item nav-link" onClick={this.logOutHandler}>Log out</a></div>
            </div>
          </div>
        ) : (<div id="navBarMenu" className="ml-auto collapse navbar-collapse justify-content-end"><LoginForm /></div>)}
      </nav>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar));
