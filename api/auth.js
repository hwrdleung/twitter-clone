require("dotenv").config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ServerResponse = require('./serverResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const verifyToken = require('./verifyToken');

router.post('/logIn', (req, res) => {
    // Authentication with bcrypt via username or email address
    // On success: return userData
    let body = req.body;
    let user; // Store user once it is found

    console.log('Client request for user log in.');

    Promise.all([
        User.findOne({ email: body.username }),
        User.findOne({ username: body.username })
    ]).then(results => {

        if (!results[0] && !results[1]) {
            res.json(new ServerResponse(false, 'User not found.'));
            throw ('Log in unsuccessful.  User not found.');
        } else {
            if (results[0]) user = results[0];
            if (results[1]) user = results[1];
            console.log('User found. ', user)
        }

        return bcrypt.compareSync(body.password, user.password);
    }).then(isValid => {
        if (!isValid) {
            res.json(new ServerResponse(false, 'Log in unsuccessful.  Invalid password.'));
            throw ('Log in unsuccessful.  Invalid password.');
        } 

        user.isLoggedIn = true;
        return user.save();
    }).then(user => {

        let body = {
            user: user,
            token: jwt.sign({ _id: user._id }, JWT_SECRET)
        }

        console.log('Log in successful.  Returning user data and JWT to client.')
        res.json(new ServerResponse(true, 'Log in successful', body));
    }).catch(error => console.log(error));
});

router.post('/logout', verifyToken, (req, res) => {
    User.findOne({_id:req._id}).then(user => {
        if(!user){
            res.json(new ServerResponse(false, 'User not found'));
            throw('User not found');
        }

        user.isLoggedIn = false;
        return user.save();
    }).then(user => {
        if(!user) {
            res.json(new ServerResponse(false, 'System error: user.isLoggedIn has not been updated to false.'));
        } else {
            res.json(new ServerResponse(true, 'Log out successful.'));
        }
    })
});

router.post('/register', (req, res) => {
    let body = req.body;

    console.log('Client request for new user registration.')
    console.log('Checking database for duplicate emails or usernames.')

    // Check for duplicate email and usernames
    Promise.all([
        User.findOne({ email: body.email }),
        User.findOne({ username: body.username })
    ]).then(results => {
        if (results[0]) {
            res.json(new ServerResponse(false, 'This email address has already been used to create an account.'));
            throw ('Registration unsuccessful.  Email address is in use.')
        } else if (results[1]) {
            res.json(new ServerResponse(false, 'This username is already in use.'))
            throw ('Registration unsuccessful.  Username is in use.')
        }

        console.log('Email and username available.  Hasing password.')
        return bcrypt.hash(body.password, 10);
    }).then(hash => {
        // Format all strings as necessary
        // Set defaults for: profileImgUrl and splashImgUrl
        // Create a unique userId
        // Create new User and save to database
        console.log('Creating new user account.')

        let newUser = new User({
            isLoggedIn: true,
            dateJoined: new Date(),
            firstName: capitalize(body.firstName),
            lastName: capitalize(body.lastName),
            email: body.email,
            username: body.username,
            password: hash,
            city: body.city,
            state: body.state,
            birthday: body.birthday,
            bio: 'Hello world!',
            profileImgUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
            splashImgUrl: 'https://image.freepik.com/free-photo/blue-sky-with-clouds_1112-454.jpg',
            tweets: [],
            followers: [],
            following: [],
            incomingFollowRequests: [],
            outgoingFollowRequests: [],
            messages: [],
            settings: {
                displayEmail: true,
                displayLocation: true,
                displayBirthday: true,
                isPrivate: false,
                autoAcceptFollowRequests: false
            },
            stats : {
                tweets: 0,
                following: 0,
                followers: 0,
                likes: 0,
                messages: 0
            }
        })

        return newUser.save();
    }).then(user => {
        if (!user) {
            res.json(new ServerResponse(false, 'Registration unsuccessful.  Please try again.'));
            throw ('Registration unsuccessful.  There was an error saving new user to MongoDB.')
        } else {

            let body = {
                user: user,
                token: jwt.sign({ _id: user._id }, JWT_SECRET)
            }

            console.log('Registration successful.  Returning user data and JWT to client.')
            res.json(new ServerResponse(true, 'Registraion successful', body));
        }
    }).catch(error => console.log(error));
});

// Helper function for capitalizing strings
function capitalize(str) {
    let finalStr = str.split(' ');
    // String might have spaces.
    for (let i = 0; i < finalStr.length; i++) {
        finalStr[i] = finalStr[i].charAt(0).toUpperCase() + finalStr[i].substring(1, finalStr[i].length);
    }

    return finalStr.join(' ');
}


module.exports = router;


