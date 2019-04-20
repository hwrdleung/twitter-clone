export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_PROFILE_STATE':
      return action.payload
    case 'UPDATE_TWEET':
      // Look for tweet that matches action.payload and replace 
      let stateCopy = { ...state };
      let tweetIndex = stateCopy.tweets.findIndex(tweet => {
        return tweet._id === action.payload._id
      })

      stateCopy.tweets[tweetIndex] = action.payload;
      return stateCopy;
    default:
      return state
  }
}