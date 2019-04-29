import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserCard from '../user-card/userCard';
import { followRequestResponse, getUserCards } from '../../state/actions/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spinner } from "react-bootstrap";
import './style.css';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    followRequestResponse: (data, token) => dispatch(followRequestResponse(data, token)),
    getUserCards: (usernames, isDashboard, key) => dispatch(getUserCards(usernames, isDashboard, key))
});

class Followers extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true
        }
    }

    componentWillMount() {
        this.refreshUserCards();
    }

    componentDidUpdate(prevProps) {
        if (this.props.isDashboard) {
            if (prevProps.user.followers !== this.props.user.followers ||
                prevProps.user.incomingFollowRequests !== this.props.user.incomingFollowRequests) {
                this.refreshUserCards();
            }
        }
    }

    refreshUserCards = () => {
        this.setState({ isLoading: true })
        let source = this.props.isDashboard ? this.props.user : this.props.profile;

        // Update store with userCards for FOLLOWERS
        this.props.getUserCards(source.followers, this.props.isDashboard, 'followersUserCards').then(res => {
            this.setState({ isLoading: false })
        }).catch(error => console.log(error));

        // Update store with userCards for INCOMING FOLLOW REQUESTS
        if (this.props.isDashboard) {
            this.props.getUserCards(source.incomingFollowRequests, this.props.isDashboard, 'incomingFollowRequestsUserCards').then(res => {
                this.setState({ isLoading: false })
            }).catch(error => console.log(error));
        }
    }

    handleFollowRequest = (username, accept) => {
        let token = sessionStorage.getItem('twitterCloneToken');
        let data = {
            username: username,
            accept: accept
        }

        // Action updates the store, which should update the UI.  No need for any follow up here.
        this.props.followRequestResponse(data, token).catch(error => console.log(error));
    }

    renderFollowers = () => {
        if (this.state.isLoading) {
            return <div className="container text-center py-4"><Spinner animation="border" variant="primary" /></div>
        }

        let source = this.props.isDashboard ? this.props.user : this.props.profile;

        if (source.followers.length === 0) {
            return (
                <div className="container-fluid">
                    <p className="text-center small font-italic my-5 text-secondary">
                        {source.username} has no followers.</p>
                </div>
            )
        } else {
            return source.followersUserCards.map(userCard =>
                (<UserCard data={userCard} />)
            );
        }
    }

    renderFollowRequests = () => {
        let source = this.props.isDashboard ? this.props.user : this.props.profile;

        if (this.state.isLoading) return null;

        // Only render follow requests for dashboard component.
        if (!this.props.isDashboard) {
            return null
        } else if (source.incomingFollowRequestsUserCards.length > 0) {
            return (
                <React.Fragment>
                    <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />
                    <h5>Follow Requests:</h5>
                    <div className="d-flex flex-row mb-5">
                        {source.incomingFollowRequestsUserCards.map(userCard => (
                            <div className="text-center">
                                <UserCard data={userCard} />

                                <div className="request-btn-container">
                                    <button
                                        className="btn btn-success request-btn mx-1 shadow text-center"
                                        onClick={() => this.handleFollowRequest(userCard.username, true)}>
                                        <FontAwesomeIcon icon={['fas', 'check']} className="text-light" />
                                    </button>

                                    <button
                                        className="btn btn-danger request-btn mx-1 shadow text-center"
                                        onClick={() => this.handleFollowRequest(userCard.username, false)}>
                                        <FontAwesomeIcon icon={['fas', 'times']} className="text-light" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderFollowRequests()}

                <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />
                <h5>Followers:</h5>
                <div className="d-flex flex-row flex-wrap">
                    {this.renderFollowers()}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Followers);
