const generateFeed = (tweetIndex, maxTweetIndex, profiles, feed, feedMaxLength) => {
    // Recursion exit conditions: 
    // If we have enough tweets OR we have already added all tweets from all profiles in following[]
    if (feed.length === feedMaxLength || tweetIndex > maxTweetIndex) {
        return feed;
    }

    // Add current iteration's profile.tweets[tweetIndex] to feed.
    // Break if feed has reached max length specified above.
    for (let i = 0; i < profiles.length; i++) {
        if (feed.length === feedMaxLength) break;
        if (profiles[i].tweets[tweetIndex]) feed.push(profiles[i].tweets[tweetIndex]);
    }

    // Call self for text iteration
    tweetIndex = tweetIndex + 1
    generateFeed(tweetIndex, maxTweetIndex, profiles, feed, feedMaxLength);
    return feed;
}

module.exports = generateFeed;