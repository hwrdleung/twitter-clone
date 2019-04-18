import React, { Component } from 'react';
import './style.css';

class Header extends Component {
  render() {
    return (
      <div className="">
        <div id="splash-container">
          <img className="img-fluid p-0" src="https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg" />
        </div>

        <div className="container-fluid shadow-sm my-0 p-0">
          <div className="container">
            <div className="d-flex justify-content-center flex-wrap mx-auto">
              <ul className="stat-box list-unstyled text-center">
                <li>Following</li>
                <li className="font-weight-bold">95</li>
              </ul>

              <ul className="stat-box list-unstyled text-center">
                <li>Followers</li>
                <li className="font-weight-bold">34</li>
              </ul>

              <ul className="stat-box list-unstyled text-center">
                <li>Likes</li>
                <li className="font-weight-bold">51</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Header;
