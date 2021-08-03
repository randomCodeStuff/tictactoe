import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import store from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <Game />,
  </Provider>,
  document.getElementById('root')
);
