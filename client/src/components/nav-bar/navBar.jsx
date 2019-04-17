import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

class NavBar extends Component {
  render() {
    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <NavLink to="/public">Public</NavLink>
      </div>
    );
  }
}

export default NavBar;
