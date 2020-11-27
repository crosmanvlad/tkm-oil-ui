import React, { useState, useEffect, useContext } from 'react';
import { MdPerson, MdMenu } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { TOKEN, USERNAME, ROLE } from '../../utils/constants';
import { getCookie, removeCookie } from '../../utils/cookie-handler';
import UserContext from '../../context/UserContext';
import './Header.scss';

const Header = () => {
  const [isLogged, setIsLogged] = useState(false);
  const history = useHistory();
  const user = useContext(UserContext);

  const logout = () => {
    removeCookie(TOKEN);
    removeCookie(USERNAME);
    removeCookie(ROLE);
    setIsLogged(false);
    history.push('/login');
  };

  useEffect(() => {
    if (getCookie(TOKEN)) {
      setIsLogged(true);
    }
  }, [user]);

  return (
    <div className="tkm-oil-header">
      <div className="logo-container">
        <img src="http://colectareuleialimentar.ro/wp-content/uploads/2016/05/logo-WEB.png" alt="TKM Oil Logo" />
      </div>
      {isLogged && (
        <div className="controls">
          <MdPerson className="logout" size={26} onClick={logout} />
          <MdMenu className="menu mobile" size={28} />
        </div>
      )}
    </div>
  );
};

export default Header;
