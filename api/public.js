const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ServerResponse = require('./serverResponse');
const getPublicProfile = require('./getPublicProfile');

router.get('/:username', (req, res) => {
    // Returns data for client to display public profile
    // Check req.headers for token.  
    console.log('Client requesting profile data for ', req.params.username)
    User.findOne({ username: req.params.username}).then(user => {
        if(!user) {
            res.json(new ServerResponse(false, 'User not found.'));
            throw('User not found.');
        } else {
            console.log(getPublicProfile(user));
            res.json(new ServerResponse(true, `Public profile for user: ${req.params.username}`, getPublicProfile(user)));
        }
    }).catch(error => console.log(error));
});

router.get('/:username/feed/:page', (req, res) => {
    // This route enables pagination of username's tweet feed.
    // 1 page === 10 tweets
});

module.exports = router;