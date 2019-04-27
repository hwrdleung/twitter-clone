const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ServerResponse = require('./serverResponse');
const getPublicProfile = require('./getPublicProfile');
const getStats = require('./getStats');

router.get('/:username', (req, res) => {
    // Returns data for client to display public profile
    // Check req.headers for token.  
    console.log('Client requesting profile data for ', req.params.username)
    User.findOne({ username: req.params.username }).then(user => {
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
            res.json(new ServerResponse(true, `Public profile for user: ${req.params.username}`, getPublicProfile(user)));
        }
    }).catch(error => console.log(error));
});

router.get('/:username/feed/:page', (req, res) => {
    // This route enables pagination of username's tweet feed.
    // 1 page === 10 tweets
});

router.put('/getUserCards', (req, res) => {
    let usernames = req.body.usernames;
    console.log(req.body, 'get user cards')

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