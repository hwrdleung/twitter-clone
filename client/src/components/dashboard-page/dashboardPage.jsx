import React, { Component } from 'react';
import Header from '../header/header'
import DashboardFeed from '../dashboard-feed/dashboardFeed'
import Bio from '../bio/bio';
import { connect } from 'react-redux';
import { getUserData } from '../../state/actions/action';
import './style.css';
import Followers from '../followers/followers';
import Following from '../following/following';
import Messages from '../messages/messages';



const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
});

class DashboardPage extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidUpdate() {
    if (!this.props.user.isLoggedIn) this.props.history.push('/')
  }

  componentDidMount() {
    console.log(this.props.user.currentView)
  }

  renderComponentBody() {
    switch (this.props.user.currentView) {
      case 'TWEETS':
        return <DashboardFeed data={this.props.user} isDashboard={true} />
        break;
      case 'FOLLOWERS':
        return <Followers data={this.props.user.followers} isDashboard={true} />
        break;
      case 'FOLLOWING':
        return <Following data={this.props.user.following} isDashboard={true} />
        break;
      case 'MESSAGES':
        return <Messages data={this.props.user.messages} />
        break;
    }
  }

  render() {
    return (
      <div className="pb-5">
        <Header data={this.props.user} isDashboard={true} />
        <div className="container py-5">
          <div className="row">
            <div className="col-md-3 mb-2">
              <Bio data={this.props.user} />
            </div>

            <div className="col-sm-7 mb-2 mr-2">
              {this.renderComponentBody()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
