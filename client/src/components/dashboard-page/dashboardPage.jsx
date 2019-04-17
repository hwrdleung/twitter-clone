import React, { Component } from 'react';
import Header from '../header/header'
import DashboardFeed from '../dashboard-feed/dashboardFeed'
import Tweeter from '../tweeter/tweeter'
import Bio from '../bio/bio';
import './style.css';

class DashboardPage extends Component {
  render() {
    return (
      <div>
      <h1>DASHBOARD PAGE</h1>
      <Header/>
      <DashboardFeed/>
      <Tweeter />
      <Bio/>
      </div>
    );
  }
}

export default DashboardPage;
