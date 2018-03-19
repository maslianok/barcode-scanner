import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './app/store';
import Scanner from './app/containers/Scanner';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Scanner />
      </Provider>
    );
  }
}
