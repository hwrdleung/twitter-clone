/*
    This function is responsible for providing the user with the tweet feed that shows up in the user's dashboard.
    The feed should consist of tweets from profiles that the user is following.

    It recursively adds tweets to the feed from profiles in the user's following[] until:
        1)  The feed has reached the maximum length (specified in the parent function)
                or
        2) All tweets from all profiles in the user's following[] have been added to the feed (this would only happen if following[].length is small)

    Currently, this function would not work that great if user.following.length is larger than feedMaxLength because
    it would always grab the first tweets from the first feedMaxLength-number of profiles, and never return tweets from the profiles whose
    index is greater than feedMaxLength.

    To handle a user who is following a large number of profiles, this function would need to be changed
    so that it returns tweets that are most relevant to the user.

    To achieve this, the app would need to implement a system which gathers user activity data to help identify the tweets which
    are most relevant to this user.  However, this is beyond the scope of this project.
*/

const generateFeed = (tweetIndex, maxTweetIndex, profiles, feed, feedMaxLength) => {
    // Recursion exit conditions: 
    // If we have enough tweets OR we have already added all tweets from all profiles in following[]
    if (feed.length === feedMaxLength || tweetIndex > maxTweetIndex) return feed;

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