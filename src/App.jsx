import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { HashRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import { UserProvider } from './context/UserContext';
import Routes from './Routes';

const App = () => {
  return (
    <CookiesProvider>
      <UserProvider>
        <Router>
          <Header />
          <Routes />
        </Router>
      </UserProvider>
    </CookiesProvider>
  );
};

export default App;
