import React, { Component } from 'react';
import Header from '../header/header'
import DashboardFeed from '../dashboard-feed/dashboardFeed'
import Bio from '../bio/bio';
import './style.css';

class DashboardPage extends Component {
  render() {
    return (
      <div className="bg-light">
        <Header />
        <div className="container my-5">
          <div className="row">
            <Bio/>
            <DashboardFeed/>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;
