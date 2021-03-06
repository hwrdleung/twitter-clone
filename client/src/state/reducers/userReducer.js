import { initialUserState } from '../initialState'

export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_USER_STATE':
      return { ...state, ...action.payload };
    case 'CLEAR_USER_STATE':
      return initialUserState;
    case 'UPDATE_TWEET':
      // Look for tweet that matches action.payload and replace 
      let newState = { ...state };
      let tweetIndex = newState.feed.findIndex(tweet => {
        return tweet._id === action.payload.tweet._id
      })

      // Update stats if necessary
      if (action.payload.profile.username === newState.username) {
        newState.stats = action.payload.profile.stats
      }

      newState.feed[tweetIndex] = action.payload.tweet;
      return newState;
    case 'SET_USER_CURRENT_VIEW':
      return { ...state, currentView: action.payload }
    case 'UPDATE_USER_MESSAGES':
      return { ...state, messages: action.payload.messages, stats: action.payload.stats }
    default:
      return state
  }
}