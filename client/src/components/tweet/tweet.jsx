import React, { Component } from 'react';
import { connect } from 'react-redux';
import { like, reply } from '../../state/actions/action';
import Tweeter from '../tweeter/tweeter';
import './style.css';
import Modal from 'react-bootstrap/Modal';
import { NavLink, withRouter } from 'react-router-dom';
import LoginForm from '../login-form/loginForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getProfileUrl, getFormattedDate } from '../../helpers';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  like: (data, token) => dispatch(like(data, token)),
  reply: (data, token) => dispatch(reply(data, token))
});


class Tweet extends Component {
  constructor() {
    super();
    this.state = {
      displayReplyModal: false,
      displayLoginModal: false,
      viewReplies: false
    }
  }

  componentWillReceiveProps(newProps) {
    // Reply modal: On reply tweet success, close reply modal
    if (newProps.data.replies.length === this.props.data.replies.length + 1) {
      this.setState({ displayReplyModal: false })
    }
  }

  handleLike = () => {
    let token = sessionStorage.getItem('twitterCloneToken');
    let data = {
      profileId: this.props.data.userId,
      tweetId: this.props.data._id
    }

    this.props.like(data, token).catch(error => console.log(error));
  }

  handleReply = () => {
    if (!this.props.user.isLoggedIn) {
      this.toggleLoginModal();
    } else {
      this.toggleReplyModal();
    }
  }

  toggleReplyModal = () => {
    this.setState(oldState => ({ displayReplyModal: !oldState.displayReplyModal }));
  }

  toggleLoginModal = () => {
    this.setState(oldState => ({ displayLoginModal: !oldState.displayLoginModal }));
  }

  toggleViewReplies = () => {
    this.setState(oldState => ({ viewReplies: !oldState.viewReplies }));
  }

  getFormattedDate = (dateStr) => {
    let months = 'January February March April May June July August September October November December'.split(' ');
    let dateObj = new Date(dateStr);
    let month = months[dateObj.getMonth() + 1];
    let date = dateObj.getDate();
    let year = dateObj.getFullYear();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes() > 10 ? dateObj.getMinutes() : '0' + dateObj.getMinutes();
    let amPm = 'AM';

    if (hours > 11) {
      amPm = 'PM';
      hours = hours - 12;
      hours = hours === 0 ? 12 : hours;
    }

    return `${month} ${date}, ${year} ${hours}:${minutes} ${amPm}`;
  }

  renderLoginModal() {
    if (this.state.displayLoginModal) {
      return (
        <Modal centered className="px-auto mx-auto" show={this.state.displayLoginModal} onHide={this.toggleLoginModal}>
          <div className="modal-content overflow-hidden">
            <Modal.Header className="m-0 px-2 py-1">
              <Modal.Title className="h5">Log in</Modal.Title>
              <button type="button" className="close" onClick={this.toggleLoginModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>
            <Modal.Body className="p-0 m-0">
              <div className="bg-light py-4"><LoginForm /></div>
            </Modal.Body>
          </div>
        </Modal>
      )
    } else {
      return null;
    }
  }

  renderTweeter() {
    console.log(this.props.isDashboard);
    if (!this.props.isDashboard &&
      this.props.profile.isPrivate &&
      !this.props.profile.includes(this.props.user.username)) {
        return <p>This profile is set to private.</p>
    } else {
      return <Tweeter isReply={true} data={this.props.data} />
    }
  }

  renderReplyModal() {
    if (this.state.displayReplyModal) {
      return (
        <Modal.Dialog size="lg">
          <Modal.Header className="m-0 px-2 py-1">
            <Modal.Title className="h5">Reply</Modal.Title>
            <button type="button" className="close" onClick={this.toggleReplyModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </Modal.Header>

          <Modal.Body className="p-3 m-0">
            {this.renderTweeter()}
          </Modal.Body>
        </Modal.Dialog>
      )
      // return <div>REPLY Modal</div>
    }
  }

  renderRepliesViewer() {
    if (this.state.viewReplies) {
      let replyFeed = this.props.data.replies.slice().reverse().map(replyTweet => <Tweet key={replyTweet._id} data={replyTweet} isReply="true" />);

      return (
        <Modal centered className="px-auto mx-auto" show={this.state.viewReplies} onHide={this.toggleViewReplies}>
          <div className="modal-content overflow-hidden">
            <Modal.Header className="m-0 px-2 py-1">
              <Modal.Title className="h5">View Replies</Modal.Title>
              <button type="button" className="close" onClick={this.toggleViewReplies}>
                <span aria-hidden="true">&times;</span>
              </button>
            </Modal.Header>
            <Modal.Body className="p-0 m-0 d-flex flex-column justify-content-center align-items-center">
              {this.props.data.replies.length ? replyFeed : <p className="mx-auto text-sm-center mt-3 mx-auto font-italic">This tweet does not have any replies.</p>}
            </Modal.Body>
          </div>
        </Modal>
      )
    }
  }

  getLikeIcon() {
    if (this.props.data.likes.includes(this.props.user.username)) {
      return <FontAwesomeIcon className="fa-icon-link text-silver icon-sm" icon={['fas', 'heart']} onClick={this.handleLike} />;
    } else {
      return <FontAwesomeIcon className="fa-icon-link text-silver icon-sm" icon={['far', 'heart']} onClick={this.handleLike} />;
    }
  }


  render() {
    return (
      <div className="container-fluid p-2 my-0 text-right bg-light shadow">
        <div className="container d-flex">
          <div>
            <img src={this.props.data.profileImgUrl} className="rounded-circle tweet-portrait" />
          </div>

          <div className="ml-3 my-0 w-100">
            <div className="d-flex flex-wrap tweet-header">
              <p className="font-weight-bold">{this.props.data.firstName}, {this.props.data.lastName}</p>
              <NavLink className="text-secondary" to={getProfileUrl(this.props.data.username)}>@{this.props.data.username}</NavLink>
              <p className="text-secondary">{getFormattedDate(this.props.data.date)}</p>
            </div>

            <p className="tweet-body m-0 pt-2 pb-4">{this.props.data.text}</p>
            {this.props.isReply ? null :
              <div className="d-flex mx-auto p-0 btn-group-sm justify-content-between">
                <a className="d-flex justify-content-center align-items-center">
                  <p className="my-0 mx-1 p-0 text-silver">{this.props.data.likes.length}</p>
                  {this.getLikeIcon()}
                </a>

                <a className="d-flex justify-content-center align-items-center">
                  <p className="my-0 mx-1 p-0 text-silver">{this.props.data.replies.length}</p>
                  <FontAwesomeIcon className="fa-icon-link text-silver icon-sm" icon={['fas', 'comment-dots']} onClick={this.toggleViewReplies} />
                </a>

                <a className="d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon className="fa-icon-link text-silver icon-sm" icon={['fas', 'reply']} onClick={this.handleReply} />
                </a>

              </div>
            }
          </div>
        </div>

        {this.renderReplyModal()}
        {this.renderLoginModal()}
        {this.renderRepliesViewer()}

      </div>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tweet));
