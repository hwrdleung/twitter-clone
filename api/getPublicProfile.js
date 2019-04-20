function getPublicProfile(user){
    // This function takes in a user object straight from MongoDB and returns
    // an object that excludes any private information per user.settings
    let publicProfile = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        dateJoined : user.dateJoined,
        profileImgUrl: user.profileImgUrl,
        splashImgUrl : user.splashImgUrl,
        followers : user.followers,
        following: user.following,
        isPrivate: user.settings.isPrivate,
        stats: user.stats,
        _id: user._id
    }

    if(!user.settings.isPrivate){
        publicProfile.bio = user.bio;
        publicProfile.email = user.settings.displayEmail ? user.email : null;
        publicProfile.city = user.settings.displayLocation ? user.city : null;
        publicProfile.state = user.settings.displayLocation ? user.state : null;
        publicProfile.birthday =  user.settings.displayBirthday ? user.birthday : null;
        publicProfile.tweets = user.settings.isPrivate ? null : user.tweets;
    }

    return publicProfile;
}

module.exports = getPublicProfile;