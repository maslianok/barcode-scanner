import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import createReducer from './reducers';

export default function configureStore(initialState = {}) {
  const middlewares = [thunk];
  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(
    createReducer(),
    initialState,
    compose(...enhancers),
  );

  return store;
}
