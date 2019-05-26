import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserCard from '../user-card/userCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUserCards } from '../../state/actions/action';

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    getUserCards: (usernames, isDashboard, key) => dispatch(getUserCards(usernames, isDashboard, key))
});

class Following extends Component {
    // This component renders usercards for the users that user/profile is following.
    getSource = () => {
        if(this.props.isDashboard){
            return this.props.user;
        } else {
            return this.props.profile;
        }
    }

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
        // Update store with userCards for FOLLOWERS
        this.props.getUserCards(this.getSource().following, this.props.isDashboard, 'followingUserCards')
            .catch(error => console.log(error));

        // Update store with userCards for INCOMING FOLLOW REQUESTS
        if (this.props.isDashboard) {
            this.props.getUserCards(this.getSource().outgoingFollowRequests, this.props.isDashboard, 'outgoingFollowRequestsUserCards')
                .catch(error => console.log(error));
        }
    }

    renderFollows = () => {
        if (this.getSource().following.length === 0) {
            return (<div className="container-fluid">
                    <p className="text-center small font-italic my-5 text-secondary">
                        {this.getSource().username} is not following anyone.</p>
                </div>)
        } else {
            return (<div className="d-flex flex-row flex-wrap mb-5 user-cards-container">
                {this.getSource().followingUserCards.map(userCard =>(<UserCard data={userCard} />))}
            </div>)}
    }

    renderPendingFollows = () => {
        // Only render pending follows for dashboard component
        if (!this.props.isDashboard) {
            return null
        } else if (this.getSource().outgoingFollowRequests.length > 0) {
            return (
                <React.Fragment>
                    <FontAwesomeIcon icon={['fas', 'dove']} className="icon-sm mb-2 text-primary" />
                    <h5>Pending:</h5>
                    <div className="d-flex flex-row flex-wrap mb-5 user-cards-container">
                        {this.getSource().outgoingFollowRequestsUserCards.map(userCard => (
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
