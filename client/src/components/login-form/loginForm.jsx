import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../state/actions/action';
import { withRouter } from 'react-router-dom';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  login: (data) => dispatch(login(data)),
});


class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      serverRes: {}
    }
  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    let data = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    this.props.login(data).then(res => {
      console.log(res);
      this.setState({ serverRes: res });
    }).catch(error => console.log(error));
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
      <form onSubmit={this.formSubmitHandler} id="login-form" className="form-group m-0 d-flex flex-row flex-wrap justify-content-center align-items-center bg-light">
        <div className="pt-2">{this.renderServerMsg()}</div>
        <input type="text" className="form-control form-control-sm m-1" placeholder="Username or email" name="username" />
        <input type="password" className="form-control form-control-sm m-1" placeholder="Enter your password" name="password" />
        <input type="submit" className="btn btn-sm btn-primary m-1" value="Log in" />
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));
