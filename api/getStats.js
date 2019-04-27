// This function takes in a user object, calculates the stats, and returns stats as an object.
const getStats = (user) => {
    return stats = {
        followers: user.followers.length,
        following: user.following.length,
        tweets: user.tweets.length,
        likes: sumAllLikes(user.tweets),
        messages : user.messages.length
    }
}

const sumAllLikes = (tweets) => {
    let sum = 0;

    tweets.forEach(tweet => {
        sum += tweet.likes.length;
    });

    return sum;
}

module.exports = getStats;