import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameRedux from './GameRedux';
import store from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <GameRedux />,
  </Provider>,
  document.getElementById('root')
);
