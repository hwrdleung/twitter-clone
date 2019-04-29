const express = require('express');
const router = express.Router();
const verifyToken = require('./verifyToken');
const ServerResponse = require('./serverResponse');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const TweetSchema = require('../models/Tweet');
const Tweet = mongoose.model('Tweet', TweetSchema);
const getPublicProfile = require('./getPublicProfile');
const getStats = require('./getStats');

/*  All routes in this file must be secured  */

/*
    The following routes enable the functioning of the client's dashboard,
    and should only manipulate the data of the user that is signed in.
*/

router.get('/getUserData', verifyToken, (req, res) => {
    // Updates stats and returns user data for populating the client's dashboard
    User.findOne({ _id: req._id }).then(user => {
        if (!user) {
            res.json(new ServerResponse(false, 'User not found.'));
            throw ('User not found.');
        }

        user.stats = getStats(user);
        return user.save();
    }).then(user => {
        if (!user) {
            res.json(new ServerResponse(false, 'System error: An error occured while updating user stats.'));
            throw ('System error: An error occured while updating user stats.');
        } else {
            // Messages are handled via /getMessages
            user.messages = null;
            res.json(new ServerResponse(true, `User data for ${user.username}`, user));
        }
    }).catch(error => console.log(error));
});

router.put('/updateUserData', verifyToken, (req, res) => {
    let body = req.body;
    // Updates userData 
    // Returns updated userData
    console.log('Client request to update user data')
    // Remember to stay consistent with mongoDB schema in the front end when sending form data
    User.findOne({ _id: req._id }).then(user => {
        if (!user) {
            res.json(new ServerResponse(false, 'User not found.'));
            throw ('User not found.');
        } else {
            if (body.city) user.city = body.city;
            if (body.state) user.state = body.state;
            if (body.bio) user.bio = body.bio;
            for (let setting in body.settings) {
                user.settings[setting] = body.settings[setting];
            }
        }

        return user.save()
    }).then(user => {
        if (!user) {
            res.json(new ServerResponse(false, 'Failed to update user data.'));
            throw ('Failed to update user data');
        } else {
            user.messages = null;
            res.json(new ServerResponse(true, 'User data updated.', user));
        }
    }).catch(error => console.log(error));
});

router.put('/changePassword', verifyToken, (req, res) => {
    let body = req.body;
    let dbUser; // Store user once it is found
    // Updates userData 
    // Returns updated userData
    console.log(body)

    User.findOne({ _id: req._id }).then(user => {
        if (!user) {
            res.json(new ServerResponse(false, 'User not found.'));
            throw ('User not found.');
        }

        dbUser = user;
        return Promise.all([
            bcrypt.compareSync(body.password, dbUser.password),
            bcrypt.hash(body.newPassword, 10)
        ])
    }).then(results => {
        if (!results[0]) {
            res.json(new ServerResponse(false, 'Authentication failed.  Invalid password.'));
            throw ('Authentication failed.  Invalid password.');
        } else {
            dbUser.password = results[1];
            return dbUser.save();
        }
    }).then(user => {
        if (!user) {
            res.json(new ServerResponse(false, 'System error: failed to save new password.'));
            throw ('System error: failed to save new password.');
        } else {
            res.json(new ServerResponse(true, 'New password has been saved.'));
        }
    }).catch(error => console.log(error));
});

router.get('/getFeed', verifyToken, (req, res) => {
    // Returns data for populating the client's tweet feed in the dashboard.
    // Tweet feed should include the most recent tweets from user's 'following' list.  
    // Ideally, this route would include an algorithm that returns a feed that would include
    // tweets from the most relevant users.
    // Include solution for pagination

    // FOr now, just return user's tweets array
    User.findOne({ _id: req._id }).then(user => {
        if (!user) {
            res.json(new ServerResponse(false, 'User not found.'));
            throw ('User not found.');
        } else {
            res.json(new ServerResponse(true, 'Returning feed for client', user.tweets));
        }
    }).catch(error => console.log(error));
});

router.post('/uploadPhoto', verifyToken, (req, res) => {
    // Upload photo to Firebase storage and update image url in MongoDB
    // Return new userData
});

router.post('/tweet', verifyToken, (req, res) => {
    let body = req.body;
    // Saves user's new tweet to database
    // Returns new userData
    User.findOne({ _id: req._id }).then(user => {
        if (!user) {
            res.json(new ServerResponse(false, 'User not found.'));
            throw ('User not found.');
        }

        console.log(user)

        let newTweet = new Tweet({
            userId: req._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            profileImgUrl: user.profileImgUrl,
            text: body.text,
            date: new Date(),
            likes: [],
            replies: []
        })

        user.tweets.push(newTweet);
        user.stats = getStats(user);

        return user.save();
    }).then(user => {
        if (!user) {
            res.json(new ServerResponse(false, 'System error: failed to save new tweet.'));
            throw ('System error: failed to save new tweet.');
        } else {
            user.messages = null;
            res.json(new ServerResponse(true, 'New tweet saved successfully.', user));
        }
    }).catch(error => console.log(error));
});

/*
    The following routes imply interactivity between two users.  The following are required:
        1.  user1's userData
        2.  user2's userData
        3.  user2's tweetData to identify which tweet to modify (for liking and replying to tweets)
*/

router.post('/like', verifyToken, (req, res) => {
    let body = req.body;
    // Toggles the adding/removal of user1's screen name to the tweet's 'likes' array
    // Returns updated data for the tweet owner's public profile (body.profile)
    /*
        body = {
            profileId: profileId
            tweetId : tweetId
        }
    */
    Promise.all([
        User.findOne({ _id: req._id }),
        User.findOne({ _id: body.profileId })
    ]).then(users => {
        if (!users[0]) {
            res.json(new ServerResponse(false, 'User not found.'));
            throw ('User not found.');
        } else if (!users[1]) {
            res.json(new ServerResponse(false, 'Profile not found.'));
            throw ('Profile not found.');
        }

        let tweet = users[1].tweets.find(tweet => {
            return tweet._id.toString() === body.tweetId
        });

        let likesIndex = tweet.likes.findIndex(username => {
            return (username === users[0].username)
        })

        // Toggle 'like'
        if (likesIndex >= 0) {
            tweet.likes.splice(likesIndex, 1);
        } else {
            tweet.likes.push(users[0].username);
        }

        users[1].stats = getStats(users[1]);
        return users[1].save();
    }).then(profile => {
        if (!profile) {
            res.json(new ServerResponse(false, 'System error: Unable to like tweet.'));
            throw ('System error: Unable to like tweet.');
        } else {
            let likedTweet; // Respond with the liked tweet

            profile.tweets.forEach(tweet => {
                if (tweet._id.toString() === body.tweetId) likedTweet = tweet
            })

            let payload = {
                tweet: likedTweet,
                profile: profile
            }

            res.json(new ServerResponse(true, 'Tweet liked.', payload));
        }
    }).catch(error => console.log(error))
});

router.post('/reply', verifyToken, (req, res) => {
    console.log('client request to reply to a tweet')
    let body = req.body;
    // Adds user's reply to the tweet's 'replies' array
    // Returns updated data for the tweet owner's public profile
    /*
        body = {
            profileId: profileId
            tweetId : tweetId
            text : tweet text
        }
    */
    Promise.all([
        User.findOne({ _id: req._id }),
        User.findOne({ _id: body.profileId })
    ]).then(users => {
        if (!users[0]) {
            res.json(new ServerResponse(false, 'User not found.'));
            throw ('User not found.');
        } else if (!users[1]) {
            res.json(new ServerResponse(false, 'Profile not found.'));
            throw ('Profile not found.');
        } else if (!users[0].following.includes(users[1].username) && (users[0].username !== users[1].username)) {
            res.json(new ServerResponse(false, 'Only followers of this user can reply to this tweet.'));
            throw ('Only followers of this user can reply to this tweet.');
        }

        let replyTweet = new Tweet({
            userId: req._id,
            firstName: users[0].firstName,
            lastName: users[0].lastName,
            username: users[0].username,
            profileImgUrl: users[0].profileImgUrl,
            text: body.text,
            date: new Date(),
            likes: [],
            replies: []
        })

        // Add replyTweet to user[1].tweets[this tweet].replies
        let tweet = users[1].tweets.find(tweet => {
            return tweet._id.toString() === body.tweetId;
        })

        tweet.replies.push(replyTweet);
        return users[1].save();
    }).then(profile => {
        if (!profile) {
            res.json(new ServerResponse(false, 'System error: failed to save new tweet reply.'));
            throw ('System error: failed to save new tweet reply.');
        } else {
            let repliedTweet; // Respond with the liked tweet

            profile.tweets.forEach(tweet => {
                if (tweet._id.toString() === body.tweetId) repliedTweet = tweet
            })

            payload = {
                tweet: repliedTweet,
                profile: profile
            }

            res.json(new ServerResponse(true, 'New tweet reply saved successfully.', payload));
        }
    }).catch(error => console.log(error));
});

router.post('/followRequestResponse', verifyToken, (req, res) => {
    let body = req.body
    let serverMessage = '';

    Promise.all([
        User.findOne({ _id: req._id }),
        User.findOne({ username: body.username })
    ]).then(users => {
        if (!users[0]) {
            res.json(new ServerResponse(false, 'User not found.'));
            throw ('User not found.');
        } else if (!users[1]) {
            res.json(new ServerResponse(false, 'Profile not found.'));
            throw ('Profile not found.');
        }

        switch (body.accept) {
            case true:
                // Move users[1].username from users[0].incoming to users[0].followers
                let index0 = users[0].incomingFollowRequests.indexOf(users[1].username);
                users[0].incomingFollowRequests.splice(index0, 1);
                users[0].followers.push(users[1].username);

                // Move users[0].username from users[1].outgoing to users[1].following
                index0 = users[1].outgoingFollowRequests.indexOf(users[0].username);
                users[1].outgoingFollowRequests.splice(index0, 1);
                users[1].following.push(users[0].username);
                // Update stats
                users[0].stats = getStats(users[0]);
                users[1].stats = getStats(users[1]);

                // Set serverMessage
                serverMessage = `Accepted follow request.`;
                break;
            case false:
                // Remove users[1].username from users[0].incoming
                let index1 = users[0].incomingFollowRequests.indexOf(users[1].username);
                users[0].incomingFollowRequests.splice(index1, 1);

                // Remove users[0].username from users[1].outgoing
                index = users[1].outgoingFollowRequests.indexOf(users[0].username);
                users[1].outgoingFollowRequests.splice(index1, 1);

                // Add message to users[1].messages
                users[1].messages.push({
                    date: new Date(),
                    from: 'Admin',
                    subject: 'Follow request notification',
                    body: `${users[0].username} has denied your follow request.`,
                    read: false
                })

                // Set serverMesage
                serverMessage = `Denied follow request.`;
                break;
        }

        users[0].stats = getStats(users[0]);
        users[1].stats = getStats(users[1]);

        // Save and respond with users[0] in the payload
        return Promise.all([
            users[0].save(),
            users[1].save()
        ])
    }).then(users => {
        if (!users[0] || !users[1]) {
            res.json(new ServerResponse(false, 'System error: Failed to handle follow request.'));
            throw ('System error: Failed to handle follow request.');
        } else {
            users[0].messages = null;
            res.json(new ServerResponse(true, serverMessage, users[0]));
        }
    }).catch(error => console.log(error));
});

router.post('/follow', verifyToken, (req, res) => {
    console.log('client request for follow')
    let body = req.body;
    let successMessage = '';
    // Toggles the adding/removal of user's screen name to/from the profile's 
    // Returns updated userData
    /*
        body = {
            profileId: profileId
        }
    */

    Promise.all([
        User.findOne({ _id: req._id }),
        User.findOne({ _id: body.profileId })
    ]).then(users => {
        if (!users[0]) {
            res.json(new ServerResponse(false, 'User not found.'));
            throw ('User not found.');
        } else if (!users[1]) {
            res.json(new ServerResponse(false, 'Profile not found.'));
            throw ('Profile not found.');
        }

        // If profile has turned off auto-accept and user is currently not following profile:
        if (!users[1].settings.autoAcceptFollowRequests &&
            !users[1].followers.includes(users[0].username)) {

            // Toggle follow request
            switch (users[1].incomingFollowRequests.includes(users[0].username)) {
                case false:
                    // Add user[0].username to user[1].incoming
                    // Add user[1].username to user[0].outgoing
                    users[1].incomingFollowRequests.push(users[0].username);
                    users[0].outgoingFollowRequests.push(users[1].username);

                    // Notify users[1] about the incoming request via messages
                    users[1].messages.push({
                        date: new Date(),
                        from: 'Admin',
                        subject: 'Follow request notification',
                        body: `@${users[0].username} has requested to follow you!  Accept or deny the request in the "Followers" tab.`,
                        read: false
                    })

                    successMessage = `Follow request sent to ${users[1].username}`;
                    break;
                case true:
                    let index = users[1].incomingFollowRequests.indexOf(users[0].username);
                    users[1].incomingFollowRequests.splice(index, 1);

                    index = users[0].outgoingFollowRequests.indexOf(users[1].username)
                    users[0].outgoingFollowRequests.splice(index, 1);

                    successMessage = `Cancelled follow request.`;
                    break;
            }

        } else {
            // Toggle add/Remove user from profile.followers
            switch (users[1].followers.includes(users[0].username)) {
                case true:
                    let index = users[1].followers.indexOf(users[0].username);
                    users[1].followers.splice(index, 1);

                    // Remove user1 from user0 following
                    index = users[0].following.indexOf(users[1].username);
                    users[0].following.splice(index, 1);
                    successMessage = `Removed ${users[0].username} to ${users[1].username}'s followers.`;
                    break;
                case false:
                    console.log('adding to followers list')
                    // Add user0 to user1 followers
                    // Add user1 to user0 following
                    users[1].followers.push(users[0].username);
                    users[0].following.push(users[1].username);
                    successMessage = `Added ${users[0].username} to ${users[1].username}'s followers.`;
                    break;
            }

            users[0].stats = getStats(users[0]);
            users[1].stats = getStats(users[1]);
        }

        return Promise.all([
            users[0].save(),
            users[1].save()
        ])
    }).then(users => {
        if (!users[0] || !users[1]) {
            res.json(new ServerResponse(false, 'System error: Failed to follow user.'));
            throw ('System error: Failed to follow user.');
        } else {
            let payload = {
                user: users[0],
                profile: getPublicProfile(users[1])
            }
            res.json(new ServerResponse(true, successMessage, payload));
        }
    }).catch(error => console.log(error));
});

router.post('/messages', verifyToken, (req, res) => {
    let body = req.body;
    /*
        body = {
            task : 'READ' || 'DELETE',
            messageId : id
        }

        returns new message object
    */
    User.findOne({ _id: req._id }).then(user => {
        console.log(body.messageId)
        switch (body.task) {
            case 'READ':
                for (let i = 0; i < user.messages.length; i++) {
                    console.log(typeof user.messages[i]._id)
                    if (user.messages[i]._id.equals(body.messageId)) user.messages[i].read = true
                }
                break;
            case 'DELETE':
                for (let i = 0; i < user.messages.length; i++) {
                    if (user.messages[i]._id.equals(body.messageId)) user.messages.splice(i, 1);
                }
                break;
        }
        user.stats = getStats(user);
        return user.save();
    }).then(user => {
        if (!user) {
            res.json(new ServerResponse(false, 'System error: An error occured while updating user messages.'));
            throw ('System error: An error occured while updating user messages.');
        } else {
            let payload = {
                messages: user.messages,
                stats: user.stats
            }
            res.json(new ServerResponse(true, `Returning user's messages.`, payload));
        }
    }).catch(error => console.log(error));
});

router.get('/messages', verifyToken, (req, res) => {
    // Returns user's messages array
    User.findOne({ _id: req._id }).then(user => {
        if (!user) {
            res.json(new ServerResponse(false, 'User not found.'));
            throw ('User not found.');
        } else {
            let payload = {
                messages: user.messages,
                stats : getStats(user)
            }
            res.json(new ServerResponse(true, `Returning user's messages.`, payload));
        }
    }).catch(error => console.log(error));
});

module.exports = router;


