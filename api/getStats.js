// This function takes in a user object, calculates the stats, and returns stats as an object.
const getStats = (user) => {
    return stats = {
        followers: user.followers.length,
        following: user.following.length,
        tweets: user.tweets.length,
        likes: sumAllLikes(user.tweets),
        messages : user.messages.length,
        newFollowRequests: user.incomingFollowRequests.length,
        newMessages : getNumberOfUnreadMessages(user.messages)
    }
}

const getNumberOfUnreadMessages = (messages) => {
    let sum = 0;

    messages.forEach(message => {
        if(message.read === false) sum++;
    });

    return sum;
}

const sumAllLikes = (tweets) => {
    let sum = 0;

    tweets.forEach(tweet => {
        sum += tweet.likes.length;
    });

    return sum;
}

module.exports = getStats;