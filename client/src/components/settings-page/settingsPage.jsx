import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserData, changePassword } from '../../state/actions/action';
import { isRequired, isAlphaOnly, isValidEmail, minLength, maxLength, passwordsMatch } from '../formValidators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spinner } from "react-bootstrap";

import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  updateUserData: (data, token) => dispatch(updateUserData(data, token)),
  changePassword: (data, token) => dispatch(changePassword(data, token))

});

class SettingsPage extends Component {
  constructor() {
    super();
    this.state = {
      isProfileFormLoading: false,
      isPasswordFormLoading: false,
      serverRes: {},
      city: '',
      state: '',
      bio: '',
      email: '',
      editProfileInfo: false,
      changePassword: false,
      settings: {
        displayEmail: false,
        displayLocation: false,
        displayBirthday: false,
        isPrivate: false
      },
      errors: {
        oldPassword: '',
        newPassword: '',
        city: '',
        state: '',
        bio: '',
        email: ''
      }
    }
  }

  componentDidMount() {
    this.fillFormsWithProps(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.fillFormsWithProps(newProps)
  }

  fillFormsWithProps(props) {
    let state = {
      ...this.state,
      city: props.user.city,
      state: props.user.state,
      bio: props.user.bio,
      email: props.user.email,
      displayEmail: props.user.settings.displayEmail,
      displayLocation: props.user.settings.displayLocation,
      displayBirthday: props.user.settings.displayBirthday,
      isPrivate: props.user.settings.isPrivate
    }
    this.setState(state)
  }

  toggleEditProfileInfo = () => {
    this.setState(oldState => ({ editProfileInfo: !oldState.editProfileInfo }));
  }

  toggleChangePassword = () => {
    this.setState(oldState => ({ changePassword: !oldState.changePassword }));
  }

  renderChangePasswordForm() {
    if (this.state.changePassword) {
      return (<form onChange={this.formChangeHandler} onSubmit={this.changePasswordFormSubmitHandler}>
        <div className="btn-container row py-1 pr-3 mt-3 d-flex flex-row justify-content-end">
          {this.state.isPasswordFormLoading ? this.renderLoader() : <input type="submit" className="btn btn-sm btn-success ml-1 mb-2" value="Save New Password" />}
          <button className="btn btn-sm btn-danger ml-1 mb-2" onClick={this.toggleChangePassword}>Cancel</button>
        </div>

        <div className="form-group">
          <label>Enter your password:</label>
          <input type="password" className="form-control" name="oldPassword" />
          <p className="small text-danger font-italic">{this.state.errors.oldPassword}</p>
        </div>

        <div className="form-group">
          <label>Choose a new password:</label>
          <input type="password" className="form-control" name="newPassword" />
          <p className="small text-danger font-italic">{this.state.errors.newPassword}</p>
        </div>

        <div className="form-group">
          <label>Re-enter your new password:</label>
          <input type="password" className="form-control" name="newPassword2" />
          <p className="small text-danger font-italic">{this.state.errors.newPassword2}</p>
        </div>
      </form>)
    }
  }

  formChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ [name]: value });
    this.setState({ [name + 'Touched']: true });
    this.validateField(name, value);
  }

  isFormValid = (keys) => {
    for (let i = 0; i < keys.length; i++) {
      if (this.state.errors[keys[i]]) return false;
    }

    return true;
  }

  editProfileFormSubmitHandler = (e) => {
    this.setState({isProfileFormLoading:true})
    e.preventDefault();

    let data = {
      city: e.target.city.value,
      state: e.target.state.value,
      email: e.target.email.value,
      bio: e.target.bio.value,
      settings: {
        displayEmail: e.target.displayEmail.checked,
        displayLocation: e.target.displayLocation.checked,
        displayBirthday: e.target.displayBirthday.checked,
        isPrivate: e.target.isPrivate.checked,

      }
    }

    if (this.isFormValid(Object.keys(data))) {
      const token = sessionStorage.getItem('twitterCloneToken');
      this.props.updateUserData(data, token).then(res => {
        this.setState({ serverRes: res, isProfileFormLoading: false });
        if (res.success) this.setState({ editProfileInfo: false })
      })
    }
  }

  changePasswordFormSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({isPasswordFormLoading: true})
    // Back-end only requires these two properties.
    let data = {
      password: e.target.oldPassword.value,
      newPassword: e.target.newPassword.value,
    }

    if (this.isFormValid(Object.keys(data))) {
      const token = sessionStorage.getItem('twitterCloneToken');
      this.props.changePassword(data, token).then(res => {
        this.setState({ serverRes: res, isPasswordFormLoading:false });
        if (res.success) this.setState({ changePassword: false })
      })
    }
  }

  validateField = (name, value) => {
    switch (name) {
      case 'city':
        this.setErrors('city', [isRequired(name, value), isAlphaOnly(name, value)]);
        break;
      case 'state':
        this.setErrors('state', [isRequired(name, value), isAlphaOnly(name, value)]);
        break;
      case 'email':
        this.setErrors('email', [isRequired(name, value), isValidEmail(name, value)]);
        break;
      case 'bio':
        this.setErrors('bio', [isRequired(name, value)]);
        break;
      case 'oldPassword':
        this.setErrors('oldPassword', [isRequired(name, value)]);
        break;
      case 'newPassword':
        this.setErrors('newPassword', [isRequired(name, value), minLength(name, value, 6)]);
        break;
      case 'newPassword2':
        console.log(this.state.newPassword, value)
        this.setErrors('newPassword2', [isRequired(name, value), passwordsMatch(this.state.newPassword, value)]);
        break;
    }
  }

  setErrors(key, validatorResults) {
    let errors = { ...this.state }.errors;
    errors[key] = '';
    this.setState({ errors: errors })

    validatorResults.forEach(result => {
      if (result !== true) {
        errors[key] = result;
        this.setState({ errors: errors });
      }
    })
  }

  formInputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  renderEditProfileForm() {
    if (this.state.editProfileInfo) {
      return (
        <form onChange={this.formChangeHandler} onSubmit={this.editProfileFormSubmitHandler}>
          <div className="btn-container row py-1 pr-3 mt-3 d-flex flex-row justify-content-end">
            {this.state.isProfileFormLoading ? this.renderLoader() : <input type="submit" className="btn btn-sm btn-success ml-1 mb-2" value="Save Profile Info" />}
            <button className="btn btn-sm btn-danger ml-1 mb-2" onClick={this.toggleEditProfileInfo}>Cancel</button>
          </div>

          <div className="form-row">
            <div className="form-group col-sm-6">
              <label>City:</label>
              <input type="text" placeholder="City" value={this.state.city} onChange={this.formInputHandler} name="city" className="form-control" />
              <p className="small text-danger font-italic">{this.state.errors.city}</p>
            </div>

            <div className="form-group col-sm-6">
              <label>State:</label>
              <input type="text" placeholder="State" value={this.state.state} onChange={this.formInputHandler} name="state" className="form-control" />
              <p className="small text-danger font-italic">{this.state.errors.state}</p>
            </div>

            <div className="form-group col-sm-6">
              <label>Email address:</label>
              <input type="text" placeholder="Email address" value={this.state.email} onChange={this.formInputHandler} name="email" className="form-control" />
              <p className="small text-danger font-italic">{this.state.errors.email}</p>
            </div>

            <div className="form-group col-sm-6">
              <label>Bio:</label>
              <input type="text" placeholder="Bio" value={this.state.bio} name="bio" onChange={this.formInputHandler} className="form-control" />
              <p className="small text-danger font-italic">{this.state.errors.bio}</p>
            </div>

            <div className="form-group col-sm-12 d-flex flex-row justify-content-between align-items-center">
              <div className="d-flex flex-wrap flex-row justify-content-center align-items-center text-center px-2"><input type="checkbox" name="displayEmail" value="displayEmail" checked={this.state.displayEmail} onChange={this.formInputHandler}/> Display email</div>
              <div className="d-flex flex-wrap flex-row justify-content-center align-items-center text-center px-2"><input type="checkbox" name="displayLocation" value="displayLocation" checked={this.state.displayLocation} onChange={this.formInputHandler}/> Display location</div>
              <div className="d-flex flex-wrap flex-row justify-content-center align-items-center text-center px-2"><input type="checkbox" name="displayBirthday" value="displayBirthday" checked={this.state.displayBirthday} onChange={this.formInputHandler}/> Display birthday</div>
              <div className="d-flex flex-wrap flex-row justify-content-center align-items-center text-center px-2"><input type="checkbox" name="isPrivate" value="isPrivate" checked={this.state.isPrivate} onChange={this.formInputHandler}/> Private tweets</div>
            </div>
          </div>

        </form>
      )
    }
  }

  renderLoader = () => {
    return <div className="text-center"><Spinner
      variant = "success"
      animation="border"
      size="sm"
      role="status"
    /></div>
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
      <div className="container-fluid d-flex py-5 justify-content-center align-items-center">
        <div id="settings-content-container" className="shadow p-4 mt-5 bg-light">
          <div className="pb-3">
            <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />

            <h1>Account settings</h1>
            <h5>{this.props.user.firstName} {this.props.user.lastName}</h5>
            <h6>@{this.props.user.username}</h6>
          </div>

          <div>{this.renderServerMsg()}</div>

          {this.state.editProfileInfo ? this.renderEditProfileForm() :
            <div>
              <div className="btn-container row py-1 mt-3">
                <button className="btn btn-sm btn-primary ml-auto mr-3" onClick={this.toggleEditProfileInfo}>Edit profile</button>
              </div>

              <p className="py-1"><span className="font-weight-bold">Location:</span>  {this.props.user.city}, {this.props.user.state}</p>
              <p className="py-1"><span className="font-weight-bold">Email address:</span>  {this.props.user.email}</p>
              <p className="py-1"><span className="font-weight-bold">Bio:</span>  {this.props.user.bio}</p>
            </div>
          }

          {this.state.changePassword ? this.renderChangePasswordForm() :
            <div className="btn-container row py-1 mt-3">
              <button className="btn btn-sm btn-primary ml-auto mr-3" onClick={this.toggleChangePassword}>Change password</button>
            </div>
          }
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
