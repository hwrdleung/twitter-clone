import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserCard from '../user-card/userCard';
import { followRequestResponse, getUserData } from '../../state/actions/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUserCards } from '../../helpers';
import './style.css';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    followRequestResponse: (data, token) => dispatch(followRequestResponse(data, token))
});

class Followers extends Component {
    constructor() {
        super();
        this.state = {
            followers: [],
            followRequests: []
        }
    }

    componentWillMount() {
        this.refreshState();
    }

    refreshState = (props) => {
        if(!props) props = this.props;

        this.setState({followRequests: []});
        this.setState({followers: []});

        if (props.isDashboard) {
            getUserCards(this.props.user.followers).then(res => {
                console.log(res)
                this.setState({ followers: res.data.body });
            }).catch(error => console.log(error));

            getUserCards(props.user.incomingFollowRequests).then(res => {
                console.log(res)
                this.setState({ followRequests: res.data.body });
            }).catch(error => console.log(error));
        } else if (!props.isDashboard) {
            getUserCards(props.profile.followers).then(res => {
                console.log(res)
                this.setState({ followers: res.data.body });
            }).catch(error => console.log(error));
        }
    }

    handleFollowRequest(username, accept) {
        let token = sessionStorage.getItem('twitterCloneToken');
        let data = {
            username: username,
            accept: accept
        }

        this.props.followRequestResponse(data, token).then(res => {
            this.refreshState();
        }).catch(error => console.log(error));
    }

    renderUserCards() {
        // if isDashboard, then populate state with data from user
        // if !isDashboard, then populate state with data from profile

        if (this.state.followers.length === 0) {
            return (
                <div className="container-fluid">
                    <p className="text-center small font-italic my-5 text-secondary">{this.props.isDashboard ? this.props.user.username : this.props.profile.username} has no followers.</p>
                </div>
            )
        } else {
            return this.state.followers.map(userCard => (<UserCard data={userCard} key={'follower' + new Date().toString()} />));
        }
    }

    renderFollowRequests() {
            if (this.state.followRequests.length) {
                return (
                    <React.Fragment>
                        <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />
                        <h5>Follow Requests:</h5>
                        <div className="d-flex flex-row mb-5">
                            {this.state.followRequests.map(followRequest => (
                                <div className="text-center">
                                    <UserCard data={followRequest} key={'request' + new Date().toString()} />

                                    <div className="request-btn-container">
                                        <button className="btn btn-success request-btn mx-1 shadow text-center" onClick={() => this.handleFollowRequest(followRequest.username, true)}>
                                            <FontAwesomeIcon icon={['fas', 'check']} className="text-light" />
                                        </button>

                                        <button className="btn btn-danger request-btn mx-1 shadow text-center" onClick={() => this.handleFollowRequest(followRequest.username, false)}>
                                            <FontAwesomeIcon icon={['fas', 'times']} className="text-light" />
                                        </button>
                                    </div>
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
                {this.props.isDashboard ? this.renderFollowRequests() : null}

                <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />
                <h5>Followers:</h5>
                <div className="d-flex flex-row flex-wrap">
                    {this.renderUserCards()}
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Followers);
