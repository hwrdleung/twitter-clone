import React, { Component } from 'react';
import Header from '../header/header'
import DashboardFeed from '../dashboard-feed/dashboardFeed'
import Bio from '../bio/bio';
import { connect } from 'react-redux';
import { getUserData } from '../../state/actions/action';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getUserData: (token) => dispatch(getUserData(token))
});

class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentWillMount() {
    let token = sessionStorage.getItem('twitterCloneToken');
    this.props.getUserData(token);
  }

  componentDidMount(){
    console.log(this.props.user);
  }

  render() {
    return (
      <div className="bg-blue-light">
        <Header data={this.props.user} />
        <div className="container py-5">
          <div className="row">
            <Bio data={this.props.user} />
            <DashboardFeed data={this.props.user} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
