import React, { Component } from 'react';
import './style.css';

class SettingsPage extends Component {
  render() {
    return (
      <div className="container-fluid full-height d-flex justify-content-center align-items-center">
        <div id="settings-content-container" className="shadow p-5">
          <div className="py-3">
            <h1 className="col-sm-12">Account settings</h1>
            <h5 className="col-sm-12">First Last</h5>
            <h6 className="col-sm-12">@username</h6>
          </div>

          <div className="row py-1">
            <p className="col-sm-6">City, State</p>
            <div className="col-sm-6 text-right"><button className="btn btn-sm btn-danger">Change location</button></div>
          </div>

          <div className="row py-1">
            <p className="col-sm-6">email@address.com</p>
            <div className="col-sm-6 text-right"><button className="btn btn-sm btn-danger">Change email</button></div>
          </div>

          <div className="row py-1">
            <p className="col-sm-6">Bio text will display here</p>
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

export default SettingsPage;
