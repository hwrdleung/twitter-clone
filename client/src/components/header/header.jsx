import React, { Component } from 'react';
import './style.css';

class Header extends Component {


  render() {

    let sumLikes = () => {
      let sum = 0;

      this.props.data.tweets.forEach(tweet => {
        sum += tweet.likes;
      })

      return sum.toString();
    }

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
                <li className="font-weight-bold">{this.props.data.following.length}</li>
              </ul>

              <ul className="stat-box list-unstyled text-center">
                <li>Followers</li>
                <li className="font-weight-bold">{this.props.data.followers.length}</li>
              </ul>

              <ul className="stat-box list-unstyled text-center">
                <li>Likes</li>
                <li className="font-weight-bold">{sumLikes()}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Header;
