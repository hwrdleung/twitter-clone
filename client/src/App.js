import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { action } from './state/actions/action';
import axios from 'axios';
import NavBar from './components/nav-bar/navBar';
import HomePage from './components/home-page/homePage';
import DashboardPage from './components/dashboard-page/dashboardPage';
import PublicPage from './components/public-page/publicPage';
import SettingsPage from './components/settings-page/settingsPage';
import ErrorPage from './components/error-page/errorPage';
import './App.css';
import RegistrationPage from './components/registration-page/registrationPage';
import LoginPage from './components/login-page/loginPage';


const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  action: () => dispatch(action())
});

class App extends Component {

  axiosTest = () => {
    axios.get('https://jsonplaceholder.typicode.com/todos/1').then(res => {
      console.log(res);
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <NavBar/>
          {/* <button onClick={this.props.action}>Test redux action</button>
          <button onClick={this.axiosTest}>axios test</button>
          <pre>
            {
              JSON.stringify(this.props)
            }
          </pre> */}
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/public" component={PublicPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/registration" component={RegistrationPage} />
            <Route component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
