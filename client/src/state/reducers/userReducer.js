export default (state = {}, action) => {
    switch (action.type) {
      case 'UPDATE_USER_DATA':
        return {...state, test: action.payload}
      default:
        return state
    }
  }