import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tweet, reply, getFeed } from '../../state/actions/action';
import { Spinner } from "react-bootstrap";
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  tweet: (data, token) => dispatch(tweet(data, token)),
  reply: (data, token) => dispatch(reply(data, token)),
  getFeed: (token) => dispatch(getFeed(token))
});

class Tweeter extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      formValue: '',
      placeholder: 'Write a new tweet!',
    }
  }

  changeHandler = (e) => {
    this.setState({ formValue: e.target.value });
  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    if (this.state.formValue) {
      this.setState({ isLoading: true });
      let token = sessionStorage.getItem('twitterCloneToken');
      let data = {
        text: this.state.formValue
      }

      if (this.props.isReply) {
        data.profileId = this.props.data.userId;
        data.tweetId = this.props.data._id;

        this.props.reply(data, token).then(res => {
          if (res.success) {
            this.setState({ formValue: '', isLoading: false })
          }
        }).catch(error => console.log(error));

      } else if (!this.props.isReply) {
        this.props.tweet(data, token).then(res => {
          if (res.success) {
            this.setState({ formValue: '', isLoading: false });
            this.props.getFeed(token).catch(error => console.log(error));
          }
        }).catch(error => console.log(error));
      }
    }
  }

  renderSubmitBtn = () => {
    let buttonText = this.props.isReply ? 'Reply' : 'Tweet';

    if (this.state.isLoading) {
      return <div className="text-center"><Spinner
        variant="primary"
        animation="border"
        size="sm"
        role="status"
      /></div>
    } else {
      return <button className="btn btn-primary" onClick={this.formSubmitHandler}>{buttonText}</button>
    }
  }

  render() {
    return (
      <form className="text-right">
        <textarea type="text" className="mb-2 w-100" placeholder={this.state.placeholder} value={this.state.formValue} onChange={this.changeHandler} />
        {this.renderSubmitBtn()}
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweeter);
