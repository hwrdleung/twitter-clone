import React, { Component } from 'react';
import RegistrationForm from '../registration-form/registrationForm'
import './style.css';

class RegistrationPage extends Component {
    render() {
        return (
            <div className="container-fluid full-height d-flex justify-content-center align-items-center">
            <div id="registration-content-container" className="shadow p-5">
                <h2>Create your account</h2>
                <RegistrationForm />
            </div>
            </div>
        );
    }
}

export default RegistrationPage;
