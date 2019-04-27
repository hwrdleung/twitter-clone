const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TweetSchema = require('./Tweet');

const UserSettingsSchema = new Schema({
    displayEmail: {type: Boolean, required: true },
    displayLocation: {type: Boolean, required: true },
    displayBirthday: {type: Boolean, required : true},
    isPrivate: {type: Boolean, required: true },
    autoAcceptFollowRequests: {type: Boolean, required: true }
},  {_id: false});

const UserStatsSchema = new Schema({
    tweets : {type: Number, required: true},
    followers: {type: Number, required: true},
    following: {type: Number, required: true},
    likes: { type: Number, required: true},
    messages : {type: Number, required: true}
}, {_id: false})

const MessageSchema = new Schema({
    date: {type: Date, required: true },
    from: {type: String, required: true },
    subject: {type: String, required: true },
    body: {type: String, required: true },
    read: {type: Boolean, required: true}
})

const UserSchema = new Schema({
    isLoggedIn: {type: Boolean, required: true },
    dateJoined: {type: Date, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    birthday: { type: String, required: true },
    bio: { type: String, required: true },
    profileImgUrl: { type: String, required: true },
    splashImgUrl: { type: String, required: true },
    messages: [MessageSchema],
    tweets: [TweetSchema],
    followers: { type: Array, required: true },
    following: { type: Array, required: true },
    incomingFollowRequests: {type: Array, required: true},
    outgoingFollowRequests: {type: Array, required: true},
    settings: {type: UserSettingsSchema, rquired: true},
    stats : { type: UserStatsSchema, required: true}
},  {_id: true});

let User = module.exports = mongoose.model('User', UserSchema);