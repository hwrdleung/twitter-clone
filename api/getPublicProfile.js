function getPublicProfile(profile, user) {
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
        email: profile.settings.displayEmail ? profile.email : null,
        city: profile.settings.displayLocation ? profile.city : null,
        state: profile.settings.displayLocation ? profile.state : null,
        birthday: profile.settings.displayBirthday ? profile.birthday : null
    }

    if (!profile.settings.isPrivate) {
        publicProfile.tweets = profile.tweets;
    }

    if (user) {
        if (profile.settings.isPrivate && profile.followers.includes(user.username) || profile.username === user.username) {
            publicProfile.tweets = profile.tweets;
        }
    }


    return publicProfile;
}

module.exports = getPublicProfile;