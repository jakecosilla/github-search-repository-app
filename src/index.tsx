import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from "react-redux";
import App from './App';
import store from './redux/Store';

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);
