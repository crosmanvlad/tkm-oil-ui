import React, { useState, useEffect, useContext } from 'react';
import { CookiesProvider } from 'react-cookie';
import { HashRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import UserContext from './context/UserContext';
import { getCookie } from './utils/cookie-handler';
import { TOKEN } from './utils/constants';
import Routes from './Routes';

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    if (getCookie(TOKEN)) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
      setShowMenu(false);
    }
  }, [user]);

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <CookiesProvider>
      <Router>
        <Header toggleMenu={toggleMenu} showMenu={showMenu} />
        <div className="content">
          {isLogged && <Menu toggleMenu={toggleMenu} showMenu={showMenu} />}
          <Routes />
        </div>
      </Router>
    </CookiesProvider>
  );
};

export default App;
