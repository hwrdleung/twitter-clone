import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tweet, reply } from '../../state/actions/action';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  tweet: (data, token) => dispatch(tweet(data, token)),
  reply: (data, token) => dispatch(reply(data, token))
});

class Tweeter extends Component {
  constructor() {
    super();
    this.state = {
      formValue: '',
      placeholder: 'Write a new tweet!',
    }
  }

  changeHandler = (e) => {
    this.setState({ formValue: e.target.value });
  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    let token = sessionStorage.getItem('twitterCloneToken');
    let data = {
      text: this.state.formValue
    }

    if (this.props.isReply) {
      data.profileId = this.props.data.userId;
      data.tweetId = this.props.data._id;

      this.props.reply(data, token).then(res => {
        if (res.success) {
          this.setState({ formValue: '' })
        }
      }).catch(error => console.log(error));

    } else if (!this.props.isReply) {
      this.props.tweet(data, token).then(res => {
        if (res.success) this.setState({ formValue: '' })
      }).catch(error => console.log(error));
    }
  }

  render() {
    let buttonText = this.props.isReply ? 'Reply' : 'Tweet';

    return (
      <form className="text-right">
        <textarea type="text" className="mb-2 w-100" placeholder={this.state.placeholder} value={this.state.formValue} onChange={this.changeHandler} />
        <button className="btn btn-primary" onClick={this.formSubmitHandler}>{buttonText}</button>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweeter);
