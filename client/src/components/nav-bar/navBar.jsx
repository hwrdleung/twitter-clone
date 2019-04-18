import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../login-form/loginForm';
import './style.css';

class NavBar extends Component {
  render() {

    let isLoggedIn = true;

    return (
      <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light shadow">
        <NavLink to="/" className="navbar-brand">Home</NavLink>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navBarMenu"><span className="navbar-toggler-icon"></span></button>

      {isLoggedIn ? ( 
        <div id="navBarMenu" className="collapse navbar-collapse">
          <div className="navbar-nav ml-auto">
            <NavLink to="/dashboard" className="nav-item nav-link ml-auto">Dashboard</NavLink>
            <NavLink to="/settings" className="nav-item nav-link ml-auto">Settings</NavLink>
            <NavLink to="/public" className="nav-item nav-link ml-auto">Public</NavLink>
            <a className="nav-item nav-link ml-auto">Sign out</a>
          </div>
        </div>
      ) : (<div className="ml-auto"><LoginForm /></div>)}
      </nav>
    );
  }
}

export default NavBar;
