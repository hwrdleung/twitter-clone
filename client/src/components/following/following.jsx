import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserCard from '../user-card/userCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUserCards } from '../../state/actions/action';
import './style.css';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    getUserCards: (usernames, isDashboard, key) => dispatch(getUserCards(usernames, isDashboard, key))
});

class Following extends Component {
    componentWillMount() {
        this.refreshUserCards();
    }

    componentDidUpdate(prevProps) {
        if (this.props.isDashboard) {
            if (prevProps.user.following !== this.props.user.following ||
                prevProps.user.outgoingFollowRequests !== this.props.user.outgoingFollowRequests) {
                this.refreshUserCards();
            }
        }
    }

    refreshUserCards = () => {
        let source = this.props.isDashboard ? this.props.user : this.props.profile;

        // Update store with userCards for FOLLOWERS
        this.props.getUserCards(source.following, this.props.isDashboard, 'followingUserCards')
            .catch(error => console.log(error));

        // Update store with userCards for INCOMING FOLLOW REQUESTS
        if (this.props.isDashboard) {
            this.props.getUserCards(source.outgoingFollowRequests, this.props.isDashboard, 'outgoingFollowRequestsUserCards')
                .catch(error => console.log(error));
        }
    }

    renderFollows = () => {
        let source = this.props.isDashboard ? this.props.user : this.props.profile;

        if (source.following.length === 0) {
            return (
                <div className="container-fluid">
                    <p className="text-center small font-italic my-5 text-secondary">
                        {source.username} is not following anyone.</p>
                </div>
            )
        } else {
            return <div className="d-flex flex-row flex-wrap mb-5 user-cards-container">
                {source.followingUserCards.map(userCard =>
                    (<UserCard data={userCard} />))}
            </div>
        }
    }

    renderPendingFollows = () => {
        let source = this.props.isDashboard ? this.props.user : this.props.profile;

        // Only render pending follows for dashboard component
        if (!this.props.isDashboard) {
            return null
        } else if (source.outgoingFollowRequests.length > 0) {
            return (
                <React.Fragment>
                    <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />
                    <h5>Pending:</h5>
                    <div className="d-flex flex-row flex-wrap mb-5 user-cards-container">
                        {source.outgoingFollowRequestsUserCards.map(userCard => (
                            <UserCard data={userCard} />
                        ))}
                    </div>
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderPendingFollows()}

                <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />
                <h5>Following:</h5>
                <div className="d-flex flex-row flex-wrap">
                    {this.renderFollows()}
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Following);
