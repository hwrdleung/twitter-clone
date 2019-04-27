import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../state/actions/action';
import { withRouter } from 'react-router-dom';
import { isRequired, minLength, passwordsMatch, isValidEmail, isAlphaNumeric, isAlphaOnly } from '../formValidators';
import './style.css';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    register: (data) => dispatch(register(data)),
});

class RegistrationForm extends Component {
    constructor() {
        super();
        this.state = {
            serverRes: {},
            errors: {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                password2: '',
                city: '',
                state: '',
                birthday: ''
            }
        }
    }

    formChangeHandler = (e) => {
        console.log(this.state);
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
        this.setState({ [name + 'Touched']: true });
        this.validateField(name, value);
    }

    setErrors(key, validatorResults) {
        let errors = { ...this.state }.errors;
        errors[key] = '';
        this.setState({ errors: errors })

        validatorResults.forEach(result => {
            if (result !== true) {
                errors[key] = result;
                this.setState({ errors: errors })
            }
        })
    }

    validateField(name, value) {
        switch (name) {
            case 'firstName':
                this.setErrors('firstName', [isRequired(name, value), isAlphaOnly(name, value)]);
                break;
            case 'lastName':
                this.setErrors('lastName', [isRequired(name, value), isAlphaOnly(name, value)]);
                break;
            case 'username':
                this.setErrors('username', [isRequired(name, value), isAlphaNumeric(name, value)]);
                break;
            case 'email':
                this.setErrors('email', [isRequired(name, value), isValidEmail(name, value)]);
                break;
            case 'password':
                this.setErrors('password', [isRequired(name, value), minLength(name, value, 6)]);
                break;
            case 'password2':
                this.setErrors('password2', [isRequired(name, value), passwordsMatch(this.state.password, value)]);
                break;
            case 'city':
                this.setErrors('city', [isRequired(name, value), isAlphaOnly(name, value)]);
                break;
            case 'state':
                this.setErrors('state', [isRequired(name, value), isAlphaOnly(name, value)]);
                break;
            case 'birthday':

                break;
        }
    }

    isFormValid() {
        // Check that all fields have values and no error messages
        let keys = Object.keys(this.state.errors);
        let validChecks = [];

        keys.forEach(key => {
            if (this.state[key] && !this.state.errors[key]) {
                validChecks.push(true);
            } else {
                validChecks.push(false);
            }
        });

        for (let i = 0; i < validChecks.length; i++) {
            if (validChecks[i] === false) return false;
        }

        console.log('form is valid')
        return true;
    }

    formSubmitHandler = (e) => {
        e.preventDefault();
        if (this.isFormValid()) {
            let data = {
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value,
                password2: e.target.password2.value,
                city: e.target.city.value,
                state: e.target.state.value,
                birthday: e.target.birthday.value
            }

            this.props.register(data).then(res => {
                this.setState({ serverRes: res });
            }).catch(error => console.log(error));
        }
    }

    componentDidUpdate() {
        if (this.props.user.isLoggedIn) this.props.history.push('/dashboard')
    }

    renderValidationMsg() {
        if (!this.state.validationMsg) return null;
        return (<p className="text-center small font-italic text-danger">{this.state.validationMsg}</p>)
    }

    renderServerMsg() {
        if (!this.state.serverRes.message) return null;

        // Set className
        let className = 'text-center small font-italic';

        if (this.state.serverRes.success) {
            className += ' text-success';
        } else if (!this.state.serverRes.success) {
            className += ' text-danger';
        }

        return (<p className={className}>*{this.state.serverRes.message}</p>);
    }

    render() {
        return (
            <form onSubmit={this.formSubmitHandler} id="registration-form" onChange={this.formChangeHandler} className="m-0 bg-light">
                <div className="p-2">{this.renderServerMsg()}</div>

                <div className="form-row">
                    <div className="form-group col-sm-6">
                        <label>First name:</label>
                        <input type="text" className="form-control m-1" placeholder="First name" name="firstName"></input>
                        <small className="text-center text-danger small font-italic">{this.state.errors.firstName}</small>
                    </div>

                    <div className="form-group col-sm-6">
                        <label>Last name:</label>
                        <input type="text" className="form-control m-1" placeholder="Last name" name="lastName"></input>
                        <small className="text-center text-danger small font-italic">{this.state.errors.lastName}</small>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-sm-6">
                        <label>Choose a username:</label>
                        <input type="text" className="form-control m-1" placeholder="username" name="username"></input>
                        <small className="text-center text-danger small font-italic">{this.state.errors.username}</small>
                    </div>

                    <div className="form-group col-sm-6">
                        <label>Enter your email address:</label>
                        <input type="email" className="form-control m-1" placeholder="Email Address" name="email"></input>
                        <small className="text-center text-danger small font-italic">{this.state.errors.email}</small>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-sm-6">
                        <label>Choose a password:</label>
                        <input type="password" className="form-control m-1" placeholder="password" name="password"></input>
                        <small className="text-center text-danger small font-italic">{this.state.errors.password}</small>
                    </div>

                    <div className="form-group col-sm-6">
                        <label>Re-enter your password:</label>
                        <input type="password" className="form-control m-1" placeholder="Re-enter password" name="password2"></input>
                        <small className="text-center text-danger small font-italic">{this.state.errors.password2}</small>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-sm-4">
                        <label>Enter your city:</label>
                        <input type="text" className="form-control m-1" placeholder="City" name="city"></input>
                        <small className="text-center text-danger small font-italic">{this.state.errors.city}</small>
                    </div>

                    <div className="form-group col-sm-4">
                        <label>Enter your state:</label>
                        <input type="text" className="form-control m-1" placeholder="State" name="state"></input>
                        <small className="text-center text-danger small font-italic">{this.state.errors.state}</small>
                    </div>

                    <div className="form-group col-sm-4">
                        <label>Enter your birthday:</label>
                        <input type="text" className="form-control m-1" placeholder="Birthday" name="birthday"></input>
                        <small className="text-center text-danger small font-italic">{this.state.errors.birthday}</small>
                    </div>
                </div>

                <div className="form-row">
                    <div className="col text-center">
                        <input type="submit" className="btn btn-sm btn-primary mx-auto" value="Sign up" />
                    </div>
                </div>
            </form >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegistrationForm));
