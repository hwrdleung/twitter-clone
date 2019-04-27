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
            following: [],
            pendingFollows: []
        }
    }

    componentWillMount() {
        this.refreshState();
    }

    refreshState = (props) => {
        if (!props) props = this.props;

        this.setState({ pendingFollows: [] });
        this.setState({ following: [] });

        if (props.isDashboard) {
            getUserCards(this.props.user.following).then(res => {
                console.log(res)
                this.setState({ following: res.data.body });
            }).catch(error => console.log(error));

            getUserCards(props.user.outgoingFollowRequests).then(res => {
                console.log(res)
                this.setState({ pendingFollows: res.data.body });
            }).catch(error => console.log(error));
        } else if (!props.isDashboard) {
            getUserCards(props.profile.following).then(res => {
                console.log(res)
                this.setState({ following: res.data.body });
            }).catch(error => console.log(error));
        }
    }

    renderUserCards = () => {
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

    renderPendingFollows = () => {
        if (this.state.pendingFollows.length) {
            return (
                <React.Fragment>
                    <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />
                    <h5>Pending:</h5>
                    <div className="d-flex flex-row mb-5">
                        {this.state.pendingFollows.map(pendingFollow => (
                            <div className="text-center">
                                <UserCard data={pendingFollow} key={'request' + new Date().toString()} />
                            </div>
                        ))
                        }
                    </div>
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            <div>
                {this.props.isDashboard ? this.renderPendingFollows() : null}

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
