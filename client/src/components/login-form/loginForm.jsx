import React, { Component } from 'react';
import './style.css';

class LoginForm extends Component {
  render() {
    return (
        <form id="login-form" class="form-group m-0 d-flex flex-row flex-wrap justify-content-center align-items-center">
          <input type="text" className="form-control form-control-sm m-1" placeholder="Username or email"></input>
          <input type="password" className="form-control form-control-sm m-1" placeholder="Enter your password"></input>
          <button className="btn btn-sm btn-primary m-1">Log in</button>
        </form>
    );
  }
}

export default LoginForm;
