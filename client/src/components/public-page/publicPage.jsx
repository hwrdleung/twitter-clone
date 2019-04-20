import React, { Component } from 'react';
import Header from '../header/header'
import PublicFeed from '../public-feed/publicFeed'
import Bio from '../bio/bio';
import { connect } from 'react-redux';
import { getProfileData } from '../../state/actions/action';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getProfileData: (username) => dispatch(getProfileData(username))
});


class PublicPage extends Component {
  componentDidMount() {
    let username = this.props.match.params.username;
    this.props.getProfileData(username).then(res => {
      console.log(res)
    }).catch(error => console.log(error));
  }

  render() {
    return (
      <div className="bg-blue-light">
        <Header data={this.props.profile} />
        <div className="container py-5">
          <div className="row">
            <Bio data={this.props.profile} />
            <PublicFeed data={this.props.profile} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicPage);
