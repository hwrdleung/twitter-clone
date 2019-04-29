import React, { Component } from 'react';
import './style.css';
import LoginForm from '../login-form/loginForm';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const mapStateToProps = state => ({
    ...state
});

class LoginPage extends Component {
    render() {
        return (
            <div className="container-fluid min-h-100 d-flex justify-content-center align-items-center">
                <div id="login-content-container" className="shadow p-5 bg-light">
                    <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />
                    <h2 className="pb-2">Log in</h2>
                    <LoginForm />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(withRouter(LoginPage));
