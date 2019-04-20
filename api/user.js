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

/*  All routes in this file must be secured  */

/*
    The following routes enable the functioning of the client's dashboard,
    and should only manipulate the data of the user that is signed in.
*/

router.get('/getUserData', verifyToken, (req, res) => {
    // Returns user data for populating the client's dashboard
    console.log(req._id);
    User.findOne({ _id: req._id }).then(user => {
        if (!user) {
            res.json(new ServerResponse(false, 'User not found.'));
            throw ('User not found.');
        } else {
            res.json(new ServerResponse(true, `User data for ${user.username}`, user));
        }
        console.log(user);
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
        console.log(user)
        if (!user) {
            res.json(new ServerResponse(false, 'Failed to update user data.'));
            throw ('Failed to update user data');
        } else {
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
    User.findOne({_id : req._id}).then(user => {
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
            text: body.text,
            date: new Date(),
            likes: [],
            replies: []
        })

        user.tweets.push(newTweet);

        return user.save();
    }).then(user => {
        if (!user) {
            res.json(new ServerResponse(false, 'System error: failed to save new tweet.'));
            throw ('System error: failed to save new tweet.');
        } else {
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

        return users[1].save();
    }).then(profile => {
        if (!profile) {
            res.json(new ServerResponse(false, 'System error: Unable to like tweet.'));
            throw ('System error: Unable to like tweet.');
        } else {
            let likedTweet; // Respond with the liked tweet

            profile.tweets.forEach(tweet => {
                if(tweet._id.toString() === body.tweetId) likedTweet = tweet
            })

            res.json(new ServerResponse(true, 'Tweet liked.', likedTweet));
        }
    }).catch(error => console.log(error))
});

router.post('/reply', verifyToken, (req, res) => {
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
        } else if (!users[0].following.includes(users[1].username)) {
            res.json(new ServerResponse(false, 'Only followers of this user can reply to this tweet.'));
            throw ('Only followers of this user can reply to this tweet.');
        }

        let replyTweet = new Tweet({
            userId: req._id,
            firstName: users[0].firstName,
            lastName: users[0].lastName,
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
    }).then(user => {
        if (!user) {
            res.json(new ServerResponse(false, 'System error: failed to save new tweet reply.'));
            throw ('System error: failed to save new tweet reply.');
        } else {
            res.json(new ServerResponse(true, 'New tweet reply saved successfully.', user));
        }
    }).catch(error => console.log(error));
});

router.post('/follow', verifyToken, (req, res) => {
    let body = req.body;
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

        //users[0] is requesting to follow users[1]
        switch (users[1].followers.includes(users[0].username)) {
            case true:
                let index = users[1].followers.indexOf(users[0].username);
                users[1].followers.splice(index, 1);

                // Remove user1 from user0 following
                index = users[0].following.indexOf(users[1].username);
                users[0].following.splice(index, 1);
                break;
            case false:
                console.log('adding to followers list')
                // Add user0 to user1 followers
                // Add user1 to user0 following
                users[1].followers.push(users[0].username);
                users[0].following.push(users[1].username);
                break;
        }

        return Promise.all([
            users[0].save(),
            users[1].save()
        ])
    }).then(users => {
        if (!users[0] || !users[1]) {
            res.json(new ServerResponse(false, 'System error: failed to follow user.'));
            throw ('System error: failed to follow user.');
        } else {
            let serverMessage = '';

            switch (users[1].followers.includes(users[0].username)) {
                case true:
                    serverMessage = `${users[0].username} is now following ${users[1].username}.`;
                    break;
                case false:
                    serverMessage = `${users[0].username} has unfollowed ${users[1].username}.`;
                    break;
            }

            res.json(new ServerResponse(true, serverMessage, getPublicProfile(users[1])));
        }
    }).catch(error => console.log(error));
});


module.exports = router;


