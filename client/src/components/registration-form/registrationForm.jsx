import React, { Component } from 'react';
import './style.css';

class RegistrationForm extends Component {
    render() {
        return (
            <form id="registration-form" class="form-group m-0 d-flex flex-row flex-wrap justify-content-center align-items-center bg-light">
                <input type="text" className="form-control form-control-sm m-1" placeholder="First name"></input>
                <input type="text" className="form-control form-control-sm m-1" placeholder="Last name"></input>
                <input type="text" className="form-control form-control-sm m-1" placeholder="Choose a username"></input>
                <input type="email" className="form-control form-control-sm m-1" placeholder="Email Address"></input>
                <input type="password" className="form-control form-control-sm m-1" placeholder="Choose a password"></input>
                <input type="password" className="form-control form-control-sm m-1" placeholder="Re-enter your password"></input>

                <button className="btn btn-sm btn-primary m-1">Sign up</button>
            </form>
        );
    }
}

export default RegistrationForm;
