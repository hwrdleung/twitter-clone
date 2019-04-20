import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import DummyTweets from './dummyData';


export default function configureStore(initialState = {}) {
  initialState = {
    profile: {
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
      stats: {
        tweets: 0,
        followers: 0,
        following: 0,
        likes: 0
      }
    },
    user: {
      isLoggedIn: false,
      dateJoined: null,
      firstName: null,
      lastName: null,
      email: null,
      username: null,
      password:null,
      city: null,
      state: null,
      birthday: null,
      bio: null,
      profileImgUrl: null,
      splashImgUrl:null,
      tweets: [],
      followers: [],
      following: [],
      settings: null,
      stats: {
        tweets : 0,
        followers: 0,
        following: 0,
        likes: 0
      }
    }
  }

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}