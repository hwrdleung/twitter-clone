import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../../state/actions/action';
import { withRouter, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  getUserData: (token) => dispatch(getUserData(token))

});

class HomePage extends Component {
  render() {
    return (
      <div className="container-fluid" id="home-page-container">
        <div className="row h-100">
          <div className="col-md-6 pt-5 bg-primary d-flex align-items-center justify-content-center">
            <ul className="list-unstyled text-light">
              <li className="my-3"><h5>Front end: React, Redux, Bootstrap</h5></li>
              <li className="my-3"><h5>Back end: NodeJS, Express</h5></li>
              <li className="my-3"><h5>Database: MongoDB</h5></li>
            </ul>
          </div>
          
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column">
              <FontAwesomeIcon icon={['fas', 'dove']} className="icon-md mb-2 text-primary"/>
              <h2>Connect with friends.</h2>
              <h5 className="mb-5">Sign up for free!</h5>
              <NavLink to="/registration" className="btn btn-primary my-1 text-light">Sign Up</NavLink>
              <NavLink to="/login" className="btn btn-primary my-1 text-light">Log in</NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
