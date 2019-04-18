import React, { Component } from 'react';
import Header from '../header/header'
import PublicFeed from '../public-feed/publicFeed'
import Bio from '../bio/bio';
import './style.css';

class PublicPage extends Component {
  render() {
    return (
      <div className="bg-light">
        <Header />
        <div className="container my-5">
          <div className="row">
            <Bio/>
            <PublicFeed/>
          </div>
        </div>
      </div>
    );
  }
}

export default PublicPage;
