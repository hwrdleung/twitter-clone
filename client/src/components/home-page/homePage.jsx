import React, { Component } from 'react';
import { connect } from 'react-redux';
import { action, register, getUserData } from '../../state/actions/action';
import './style.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  action: (str) => dispatch(action(str)),
  register: (formData) => dispatch(register(formData)),
  getUserData: (token) => dispatch(getUserData(token))

});

class HomePage extends Component {
  axiosTest = () => {
    let formData = {
      firstName: 'Howard',
      lastName: 'Leung',
      email: 'emaeal@addre.com',
      username: 'nwes2',
      password: 'password123',
      birthday: 'March 3, 1989',
      city: 'Aiea',
      state: 'HI',
      bio: 'Hello world :)'
    }

    console.log(this.props)
    this.props.register(formData);
    // axios.put('api/auth/register', formData).then(res => {
    //     console.log(res.data);
    //   })
  }

  test = () => {
    console.log(this.props);
  }

  componentDidMount() {
    this.detectUserSession();
  }

  detectUserSession = () => {
    if (sessionStorage.getItem('twitterCloneToken')) {
      let token = sessionStorage.getItem('twitterCloneToken')
      this.props.getUserData(token).then(res => {
        console.log(this.props);
        if (res.success) this.props.history.push('/dashboard');
      }).catch(error => console.log(error));
    }
  }

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
              <button onClick={this.axiosTest}>axios registration test</button>
              <button onClick={this.test}>test</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
