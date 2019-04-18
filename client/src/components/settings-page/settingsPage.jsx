import React, { Component } from 'react';
import { connect } from 'react-redux';
import { action } from '../../state/actions/action';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  action: (str) => dispatch(action(str))
});

class SettingsPage extends Component {
  render() {
    return (
      <div className="container-fluid full-height d-flex justify-content-center align-items-center">
        <div id="settings-content-container" className="shadow p-5">
          <div className="py-3">
            <h1 className="col-sm-12">Account settings</h1>
            <h5 className="col-sm-12">{this.props.user.firstName} {this.props.user.lastName}</h5>
            <h6 className="col-sm-12">@{this.props.user.username}</h6>
          </div>

          <div className="row py-1">
            <p className="col-sm-6">{this.props.user.city}, {this.props.user.state}</p>
            <div className="col-sm-6 text-right"><button className="btn btn-sm btn-danger">Change location</button></div>
          </div>

          <div className="row py-1">
            <p className="col-sm-6">{this.props.user.email}</p>
            <div className="col-sm-6 text-right"><button className="btn btn-sm btn-danger">Change email</button></div>
          </div>

          <div className="row py-1">
            <p className="col-sm-6">{this.props.user.bio}</p>
            <div className="col-sm-6 text-right"><button className="btn btn-sm btn-danger">Change bio</button></div>
          </div>

          <div className="row py-1">
            <div className="col-sm-12 text-right"><button className="btn btn-sm btn-danger">Change password</button></div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
