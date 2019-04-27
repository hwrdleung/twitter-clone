import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegistrationForm from '../registration-form/registrationForm'
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({

});

class RegistrationPage extends Component {
    componentDidUpdate() {
        if (this.props.user.isLoggedIn) this.props.history.push('/dashboard')
    }

    render() {
        return (
            <div className="container-fluid min-h-100 py-5 d-flex justify-content-center align-items-center">
                <div id="registration-content-container" className="shadow p-4 my-5 bg-light">
                    <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />
                    <h2 className="pb-2">Create your account</h2>
                    <RegistrationForm />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegistrationPage));
