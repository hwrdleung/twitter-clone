import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { initialProfileState, initialUserState } from './initialState';

export default function configureStore(initialState) {

  initialState = {
    user : initialUserState,
    profile: initialProfileState
  };

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}