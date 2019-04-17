import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import configureStore from './state/store';

import HomePage from './components/home-page/homePage';
import Bio from './components/bio/bio';
import DashboardFeed from './components/dashboard-feed/dashboardFeed'
import DashboardPage from './components/dashboard-page/dashboardPage'
import Header from './components/header/header'
import NavBar from './components/nav-bar/navBar'
import PublicFeed from './components/public-feed/publicFeed'
import PublicPage from './components/public-page/publicPage'
import SettingsPage from './components/settings-page/settingsPage'
import Tweet from './components/tweet/tweet'
import Tweeter from './components/tweeter/tweeter'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Provider store={configureStore()}><App /></Provider >, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
