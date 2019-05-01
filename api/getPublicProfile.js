const getPublicProfile = (profile, user) => {
    // This function takes in a profile object straight from MongoDB and returns
    // an object that excludes any private information per profile.settings
    let publicProfile = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        username: profile.username,
        dateJoined: profile.dateJoined,
        profileImgUrl: profile.profileImgUrl,
        splashImgUrl: profile.splashImgUrl,
        followers: profile.followers,
        following: profile.following,
        isPrivate: profile.settings.isPrivate,
        stats: profile.stats,
        _id: profile._id,
        bio: profile.bio,
        hiddenTweets: false,
        email: profile.settings.displayEmail ? profile.email : null,
        city: profile.settings.displayLocation ? profile.city : null,
        state: profile.settings.displayLocation ? profile.state : null,
        birthday: profile.settings.displayBirthday ? profile.birthday : null,
        settings: profile.settings
    }

    switch (profile.settings.isPrivate) {
        case true:
            // If profile is set to private, check the following conditions to ensure that only
            // followers of this user will get the tweets.
            if (!user) publicProfile.hiddenTweets = true;
            if (user) {
                if (profile.followers.includes(user.username) ||
                    profile.username === user.username) {
                    publicProfile.tweets = profile.tweets;
                } else {
                    publicProfile.hiddenTweets = true
                }
            }
            break;
        case false:
            publicProfile.tweets = profile.tweets;
            break;
    }

    return publicProfile;
}

module.exports = getPublicProfile;