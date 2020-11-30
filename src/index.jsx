import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/Styles.scss';
import { UserProvider } from './context/UserContext';

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById('root')
);
