import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import UserCard from '../user-card/userCard';
import { followRequestResponse, follow } from '../../state/actions/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUserCards } from '../../helpers';
import './style.css';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    followRequestResponse: (data, token) => dispatch(followRequestResponse(data, token)),
});

class Following extends Component {
    constructor() {
        super();
        this.state = {
            following: []
        }
    }

    componentWillMount() {
        this.refreshState();
    }

    refreshState() {
        Promise.all([
            getUserCards(this.props.user.following)
        ]).then(results => {
            if (results[0].data.success) this.setState({ following: results[0].data.body })
        }).catch(error => console.log(error));
    }

    renderUserCards() {
        if (this.state.following.length === 0) {
            return (
                <div className="container-fluid">
                    <p className="text-center small font-italic my-5 text-secondary">{this.props.isDashboard ? this.props.user.username : this.props.profile.username} is not following anyone.</p>
                </div>
            )
        } else {
            return this.state.following.map(userCard => (<UserCard data={userCard} key={'following' + new Date().toString()} />));
        }
    }

    render() {
        return (
            <div>
                <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />
                <h5>Following:</h5>
                <div className="d-flex flex-row flex-wrap">
                    {this.renderUserCards()}
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Following);
