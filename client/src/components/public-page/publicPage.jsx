import React, { Component } from 'react';
import Header from '../header/header'
import PublicFeed from '../public-feed/publicFeed'
import Tweeter from '../tweeter/tweeter'
import Bio from '../bio/bio';
import './style.css';

class PublicPage extends Component {
  render() {
    return (
      <div>
      <h1>PUBLIC PAGE</h1>
      <Header/>
      <PublicFeed/>
      <Tweeter />
      <Bio/>
      </div>
    );
  }
}

export default PublicPage;
