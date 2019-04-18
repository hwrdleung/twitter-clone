import React, { Component } from 'react';
import './style.css';
import LoginForm from '../login-form/loginForm';

class LoginPage extends Component {
    render() {
        return (
            <div className="container-fluid full-height d-flex justify-content-center align-items-center">
            <div id="login-content-container" className="shadow p-5">
                <h2>Log in</h2>
                <LoginForm />
            </div>
            </div>
        );
    }
}

export default LoginPage;
