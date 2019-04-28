const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    profileImgUrl: {type: String, required: true},
    text: { type: String, required: true },
    date: { type: Date, required: true },
    likes: { type: Array, required: true },
    replies: { type: Array, required: true }
}, { _id: true });

module.exports = TweetSchema;