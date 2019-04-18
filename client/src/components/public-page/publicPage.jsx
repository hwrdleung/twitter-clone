import React, { Component } from 'react';
import Header from '../header/header'
import PublicFeed from '../public-feed/publicFeed'
import Bio from '../bio/bio';
import { connect } from 'react-redux';
import { action } from '../../state/actions/action';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  action: (str) => dispatch(action(str))
});


class PublicPage extends Component {
  render() {
    return (
      <div className="bg-light">
        <Header data={this.props.profile} />
        <div className="container my-5">
          <div className="row">
            <Bio data={this.props.profile}/>
            <PublicFeed data={this.props.profile}/>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublicPage);
