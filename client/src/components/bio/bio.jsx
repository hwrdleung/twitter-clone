import React, { Component } from 'react';
import { connect } from 'react-redux';
import { follow } from '../../state/actions/action';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  follow: (data, token) => dispatch(follow(data, token))
});


class Bio extends Component {
  getFormattedDate = (dateStr) => {
    let months = 'January February March April May June July August September October November December'.split(' ');
    let date = new Date(dateStr);
    return `${months[date.getMonth() + 1]} ${date.getDate()}, ${date.getFullYear()}`;
  }

  render() {
    return (
      <div>
        <div id="portrait-container" className="mb-2">
          <img className="img-thumbnail" src={this.props.data.profileImgUrl} />
        </div>

        <h5 className="font-weight-bold">{this.props.data.firstName}, {this.props.data.lastName}</h5>
        <p className="text-secondary">@{this.props.data.username}</p>
        <p className="my-2">{this.props.data.bio}</p>
        <p className="text-secondary">Joined: {this.getFormattedDate(this.props.data.dateJoined)}</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bio);
