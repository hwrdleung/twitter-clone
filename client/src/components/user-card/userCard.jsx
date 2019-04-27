import React, { Component } from 'react';
import { getProfileUrl } from '../../helpers';
import { NavLink, withRouter } from 'react-router-dom';
import './style.css';


class UserCard extends Component {
    constructor() {
        super();
        this.state = {
        }
    }


    render() {
        return (
            <div className="user-card shadow bg-light d-flex flex-column align-items-center justify-content-end m-3 p-3"
            style={{backgroundImage:`url(${this.props.data.splashImgUrl})`}}>
                    <img className="rounded-circle img-thumbnail user-card-portrait" src={this.props.data.profileImgUrl} />
                    <div className="text-center mt-2">
                    <p className="m-0 p-0 font-weight-bold">{this.props.data.firstName} {this.props.data.lastName}</p>
                    <NavLink className="m-0 p-0 text-secondary" to={getProfileUrl(this.props.data.username)}>@{this.props.data.username}</NavLink>
                    </div>
            </div>
        )
    }

}

export default withRouter(UserCard);