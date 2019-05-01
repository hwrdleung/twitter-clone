export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE_STATE':
      return { ...state, ...action.payload };
    case 'UPDATE_TWEET':
      // Look for tweet that matches action.payload.tweet and replace 
      let newState = { ...state };
      let tweetIndex = newState.tweets.findIndex(tweet => {
        return tweet._id === action.payload.tweet._id
      })

      newState.tweets[tweetIndex] = action.payload.tweet;

      // Update stats if necessary
      if (action.payload.profile.username === newState.username) {
        newState.stats = action.payload.profile.stats
      }

      return newState;
    case 'SET_PROFILE_CURRENT_VIEW':
      return { ...state, currentView: action.payload }

    default:
      return state
  }
}