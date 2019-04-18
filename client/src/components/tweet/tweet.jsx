import React, { Component } from 'react';
import './style.css';

class Tweet extends Component {
  render() {
    return (
      <div className="tweet-container container-fluid p-3 my-0 text-right bg-light shadow-sm">
        <div className="container d-flex">
          <div className="">
            <img src="https://images.pexels.com/photos/2044231/pexels-photo-2044231.jpeg" className="rounded-circle tweet-portrait" />
          </div>

          <div className="ml-4 my-0">
            <div className="d-flex flex-wrap tweet-header">
              <p className="font-weight-bold">{this.props.data.user.firstName}, {this.props.data.user.lastName}</p>
              <p className="text-secondary">@{this.props.data.user.username}</p>
              <p className="text-secondary">{this.props.data.date}</p>
            </div>

            <p className="tweet-body m-0">{this.props.data.text}</p> 

            <div className="d-flex mx-auto p-2 btn-group-sm">
              <button className="btn btn-danger mr-1">Like</button>
              <button className="btn btn-success mr-1">Reply</button>
            </div>
          </div>
        </div>
        </div>

    );
  }
}

export default Tweet;
