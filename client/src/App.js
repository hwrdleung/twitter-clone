import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserData, getProfileData } from './state/actions/action';
import NavBar from './components/nav-bar/navBar';
import HomePage from './components/home-page/homePage';
import DashboardPage from './components/dashboard-page/dashboardPage';
import PublicPage from './components/public-page/publicPage';
import SettingsPage from './components/settings-page/settingsPage';
import ErrorPage from './components/error-page/errorPage';
import './App.css';
import RegistrationPage from './components/registration-page/registrationPage';
import LoginPage from './components/login-page/loginPage';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart as fasHeart, faReply, faCommentDots, faDove, faTimes, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

library.add(fasHeart, farHeart, faReply, faCommentDots, faDove, faTimes, faCheck, faTrash);

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getUserData: (token) => dispatch(getUserData(token)),
  getProfileData: (username) => dispatch(getProfileData(username))
});

class App extends Component {
  componentWillMount() {
    this.detectBrowserSession();
  }

  detectBrowserSession = () => {
    let token = sessionStorage.getItem('twitterCloneToken');
    if (token) this.props.getUserData(token);
  }

  render() {
    return (
      <BrowserRouter>
        <NavBar data={this.props.user} />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/profile/:username" component={PublicPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/registration" component={RegistrationPage} />
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
