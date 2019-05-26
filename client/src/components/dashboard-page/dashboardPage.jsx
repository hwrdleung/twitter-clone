import React, { Component } from 'react';
import Header from '../header/header'
import DashboardFeed from '../dashboard-feed/dashboardFeed'
import Bio from '../bio/bio';
import { connect } from 'react-redux';
import { setCurrentView } from '../../state/actions/action';
import Followers from '../followers/followers';
import Following from '../following/following';
import Messages from '../messages/messages';
import { Spinner } from 'react-bootstrap';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setCurrentView: (view, isDashboard) => dispatch(setCurrentView(view, isDashboard))
});


class DashboardPage extends Component {
  componentWillMount() {
    this.props.setCurrentView('TWEETS', true)
  }

  renderComponentBody() {
    switch (this.props.user.currentView) {
      case 'TWEETS': return <DashboardFeed />
      case 'FOLLOWERS': return <Followers isDashboard={true} />
      case 'FOLLOWING': return <Following isDashboard={true} />
      case 'MESSAGES': return <Messages />
      default: return null;
    }
  }

  renderLoader = () => {
    return (
      <div className="text-center my-5 py-5 container-fluid">
        <Spinner
          variant="primary"
          animation="border"
          role="status"
        /></div>
    )
  }

  render() {
    return (
      <div className="pb-5">
        <Header
          stats={this.props.user.stats}
          splashImgUrl={this.props.user.splashImgUrl}
          isDashboard={true} />

        {this.props.user.username === null ? this.renderLoader() :
          <div className="container py-5">
            <div className="row">
              <div className="col-md-3 mb-5">
                <Bio data={this.props.user} isDashboard={true} />
              </div>

              <div className="col-md-7 mb-2 mr-2">
                {this.renderComponentBody()}
              </div>
            </div>
          </div>}

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
