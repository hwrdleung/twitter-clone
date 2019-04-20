import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../state/actions/action';
import { withRouter } from 'react-router-dom';
import './style.css';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    register: (data) => dispatch(register(data)),
});

class RegistrationForm extends Component {
    formSubmitHandler = (e) => {
        e.preventDefault();

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

        console.log(data);

        this.props.register(data).then(res => {
            if (res.success) this.props.history.push('/dashboard');
        }).catch(error => console.log(error));
    }

    render() {
        return (
            <form onSubmit={this.formSubmitHandler} id="registration-form" className="form-group m-0 d-flex flex-row flex-wrap justify-content-center align-items-center bg-light">
                <input type="text" className="form-control form-control-sm m-1" placeholder="First name" name="firstName"></input>
                <input type="text" className="form-control form-control-sm m-1" placeholder="Last name" name="lastName"></input>
                <input type="text" className="form-control form-control-sm m-1" placeholder="Choose a username" name="username"></input>
                <input type="email" className="form-control form-control-sm m-1" placeholder="Email Address" name="email"></input>
                <input type="password" className="form-control form-control-sm m-1" placeholder="Choose a password" name="password"></input>
                <input type="password" className="form-control form-control-sm m-1" placeholder="Re-enter your password" name="password2"></input>
                <input type="text" className="form-control form-control-sm m-1" placeholder="City" name="city"></input>
                <input type="text" className="form-control form-control-sm m-1" placeholder="State" name="state"></input>
                <input type="text" className="form-control form-control-sm m-1" placeholder="Birthday" name="birthday"></input>
                <input type="submit" className="btn btn-sm btn-primary m-1" value="Sign up" />
            </form>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegistrationForm));
