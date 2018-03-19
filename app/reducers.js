import { combineReducers } from 'redux';

import scanner from './containers/Scanner/reducer';

export default function createReducer() {
  return combineReducers({
    scanner,
  });
}
