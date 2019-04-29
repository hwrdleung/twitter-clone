const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ServerResponse = require('./serverResponse');
const getPublicProfile = require('./getPublicProfile');
const getStats = require('./getStats');
const jwt = require('jsonwebtoken');
require("dotenv").config();

router.get('/:username', (req, res) => {
    // Returns data for client to display public profile
    // Check req.headers for token.  
    const token = req.header('x-auth-token') ? req.header('x-auth-token') : false;

    let storage;

    console.log('Client requesting profile data for ', req.params.username)
    User.findOne({ username: req.params.username }).then(profile => {
        if (!profile) {
            res.json(new ServerResponse(false, 'User not found.'));
            throw ('User not found.');
        }

        profile.stats = getStats(profile);
        return profile.save();
    }).then(profile => {
        if (!profile) {
            res.json(new ServerResponse(false, 'System error: An error occured while updating user stats.'));
            throw ('System error: An error occured while updating user stats.');
        } else {
            if (token !== 'null') {
                storage = profile;
                let userId = jwt.verify(token, process.env.JWT_SECRET)
                return User.findOne({ _id: userId });
            } else {
                res.json(new ServerResponse(true, `Public profile for user: ${req.params.username}`, getPublicProfile(profile)));
                throw ('Complete');
            }
        }
    }).then(user => {
        res.json(new ServerResponse(true, `Public profile for user: ${req.params.username}`, getPublicProfile(storage, user)));
    }).catch(error => console.log(error));
});

router.get('/:username/feed/:page', (req, res) => {
    // This route enables pagination of username's tweet feed.
    // 1 page === 10 tweets
});

router.put('/getUserCards', (req, res) => {
    let usernames = req.body.usernames;

    for (let i = 0; i < usernames.length; i++) {
        usernames[i] = User.findOne({ username: usernames[i] });
    }

    Promise.all(usernames).then(results => {
        let userCards = [];
        results.forEach(result => {
            userCards.push({
                username: result.username,
                firstName: result.firstName,
                lastName: result.lastName,
                profileImgUrl: result.profileImgUrl,
                splashImgUrl: result.splashImgUrl,
                userId: result._id
            })
        });

        res.json(new ServerResponse(true, 'Returning user cards.', userCards))
    }).catch(error => console.log(error));
});

module.exports = router;