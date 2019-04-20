import React, { Component } from 'react';
import './style.css';

class Header extends Component {


  render() {
    return (
      <div>
        <div id="splash-container">
          <img className="img-fluid mx-auto p-0" src="https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg" />
        </div>

        <div className="container-fluid bg-light shadow-sm my-0 p-0">
          <div className="container">
            <div className="d-flex justify-content-center flex-wrap mx-auto">
            <ul className="stat-box list-unstyled text-center">
                <li>Tweets</li>
                <li className="font-weight-bold">{this.props.data.stats.tweets}</li>
              </ul>

              <ul className="stat-box list-unstyled text-center">
                <li>Following</li>
                <li className="font-weight-bold">{this.props.data.stats.following}</li>
              </ul>

              <ul className="stat-box list-unstyled text-center">
                <li>Followers</li>
                <li className="font-weight-bold">{this.props.data.stats.followers}</li>
              </ul>

              <ul className="stat-box list-unstyled text-center">
                <li>Likes</li>
                <li className="font-weight-bold">{this.props.data.stats.likes}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Header;
