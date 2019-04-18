import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import DummyTweets from './dummyData';


export default function configureStore(initialState = {}) {
  initialState = {
    profile: {
      username: 'noodles',
      id: 40282,
      firstName: 'Profile first',
      lastName: 'Profile last',
      dateJoined: 'January 1, 2013',
      email: 'abc@123.com',
      city: 'Seattle',
      state: 'WA',
      profilePic: 'awfawawe',
      tweets: DummyTweets,
      followers: ['123', 'abc', 'anotherUser'],
      following: ['user2', 'user3']
    },
    user: {
      isLoggedIn: false,
      token: 'token',
      id: 123,
      firstName: 'First',
      lastName: 'Last',
      dateJoined: 'April 15, 2017',
      email: 'email@address.com',
      username: 'username',
      password: 'password-hash-1241193892183',
      city: 'Honolulu',
      state: 'HI',
      bio: 'The bio message will go here.',
      profilePic: 'https://images.pexels.com/photos/2044231/pexels-photo-2044231.jpeg',
      tweets: DummyTweets,
      following: ['user1', 'user2', 'user3', 'user4', 'user5'],
      followers: ['user1', 'user2', 'user3', 'user4'],
      feed: DummyTweets
    }
  }

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}