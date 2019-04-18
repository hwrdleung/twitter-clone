export default (state = {}, action) => {
    switch (action.type) {
      case 'FETCH_PROFILE_DATA':
        return {...state, test: action.payload}
      default:
        return state
    }
  }