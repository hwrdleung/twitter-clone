export const initialProfileState = {
  username: null,
  id: null,
  firstName: null,
  lastName: null,
  dateJoined: null,
  email: null,
  city: null,
  state: null,
  profilePic: null,
  tweets: [],
  followers: [],
  following: [],
  followersUserCards: [],
  followingUserCards:[],
  currentView: 'TWEETS',
  settings: {
    displayEmail: false,
    displayLocation: false,
    displayBirthday: false
  },
  stats: {
    tweets: 0,
    followers: 0,
    following: 0,
    likes: 0
  }
}

export const initialUserState = {
  isLoggedIn: false,
  dateJoined: null,
  firstName: null,
  lastName: null,
  email: null,
  username: null,
  password: null,
  city: null,
  state: null,
  birthday: null,
  bio: null,
  profileImgUrl: null,
  splashImgUrl: null,
  tweets: [],
  followers: [],
  following: [],
  incomingFollowRequests: [],
  outgoingFollowRequests: [],
  followersUserCards: [],
  followingUserCards: [],
  incomingFollowRequestsUserCards: [],
  outgoingFollowRequestsUserCards: [],
  settings: {},
  currentView: 'TWEETS',
  stats: {
    tweets: 0,
    followers: 0,
    following: 0,
    likes: 0
  }
}
