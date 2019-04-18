import React, { Component } from 'react';
import './style.css';

class HomePage extends Component {
  render() {
    return (
      <div className="container-fluid" id="home-page-container">
        <div className="row h-100">
          <div className="col-md-6 bg-primary d-flex align-items-center justify-content-center">
            <ul className="list-unstyled text-light">
              <li className="my-5"><h5>Bullet point 1</h5></li>
              <li className="my-5"><h5>Bullet point 2</h5></li>
              <li className="my-5"><h5>Bullet point 3</h5></li>
            </ul>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="d-flex flex-column">
              <h2>The slogan will go here</h2>
              <h5 className="mb-5">Secondary slogan</h5>
              <a href="/registration" className="btn btn-primary my-1 text-light">Sign Up</a>
              <a href="/login" className="btn btn-primary my-1 text-light">Log in</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
