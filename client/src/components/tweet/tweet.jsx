import React, { Component } from 'react';
import { connect } from 'react-redux';
import { like, reply } from '../../state/actions/action';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  like: (data, token) => dispatch(like(data, token)),
  reply: (data, token) => dispatch(reply(data, token)),
});


class Tweet extends Component {
  handleLike = () => {
    let token = sessionStorage.getItem('twitterCloneToken');
    let data = {
      profileId: this.props.data.userId,
      tweetId: this.props.data._id
    }

    this.props.like(data, token).catch(error => console.log(error));
  }

  handleReply = () => {
    // let token = sessionStorage.getItem('twitterCloneToken');
    // let data = {
    //   profileId : this.props.profile._id,
    //   tweetId: this.props.data._id,
    //   text
    // }

    // this.props.like(data, token).then(res => {
    //   console.log(res);
    // }).catch(error => console.log(error));
  }

  render() {
    return (
      <div className="tweet-container container-fluid p-2 my-0 text-right bg-light shadow">
        <div className="container d-flex">
          <div className="">
            <img src="https://images.pexels.com/photos/2044231/pexels-photo-2044231.jpeg" className="rounded-circle tweet-portrait" />
          </div>

          <div className="ml-4 my-0">
            <div className="d-flex flex-wrap tweet-header">
              <p className="font-weight-bold">{this.props.data.firstName}, {this.props.data.lastName}</p>
              <p className="text-secondary">@{this.props.data.username}</p>
              <p className="text-secondary">{this.props.data.date}</p>
            </div>

            <p className="tweet-body m-0">{this.props.data.text}</p>

            <div className="d-flex mx-auto p-2 btn-group-sm">
              <p>{this.props.data.likes.length}</p><button className="btn btn-danger mr-1" onClick={this.handleLike}>Like</button>
              <button className="btn btn-success mr-1" onClick={this.handleReply}>Reply</button>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
