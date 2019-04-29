import React, { Component } from 'react';
import { getProfileUrl, getBackgroundImgCss } from '../../helpers';
import { NavLink } from 'react-router-dom';
import './style.css';


class UserCard extends Component {
    render() {
        return (
            <div className="user-card shadow bg-light d-flex flex-column align-items-center justify-content-end m-2 p-2"
                style={getBackgroundImgCss(this.props.data.splashImgUrl)}>
                <img className="rounded-circle img-thumbnail user-card-portrait" src={this.props.data.profileImgUrl} />
                <div className="user-card-text-container text-left mt-0 mx-0 container-fluid">
                    <p className="m-0 p-0 small">{this.props.data.firstName} {this.props.data.lastName}</p>
                    <NavLink className="m-0 p-0 text-secondary" to={getProfileUrl(this.props.data.username)}>@{this.props.data.username}</NavLink>
                </div>
            </div>
        )
    }
}

export default UserCard;