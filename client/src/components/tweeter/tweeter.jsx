import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tweet } from '../../state/actions/action';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  tweet: (data, token) => dispatch(tweet(data, token)),
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

    this.props.tweet(data, token).then(res => {
      if (res.success) this.setState({ formValue: '' })
    }).catch(error => console.log(error));
  }

  render() {
    return (
      <form className="tweeter-container container-fluid p-3 mb-3 text-right bg-blue-light border border-light bg-light shadow">
        <input type="text" className="container mb-2" placeholder={this.state.placeholder} value={this.state.formValue} onChange={this.changeHandler} />
        <button className="btn btn-primary" onClick={this.formSubmitHandler}>Tweet</button>
      </form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweeter);
