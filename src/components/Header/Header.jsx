import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { MdPerson, MdMenu, MdClose } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { TOKEN, USERNAME, ROLE } from '../../utils/constants';
import { getCookie, removeCookie } from '../../utils/cookie-handler';
import UserContext from '../../context/UserContext';
import './Header.scss';

const Header = ({ toggleMenu, showMenu }) => {
  const [isLogged, setIsLogged] = useState(false);
  const history = useHistory();
  const user = useContext(UserContext);

  const logout = () => {
    removeCookie(TOKEN);
    removeCookie(USERNAME);
    removeCookie(ROLE);
    setIsLogged(false);
    user.updateUserContext('', '', '');
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
          {showMenu ? (
            <MdClose onClick={toggleMenu} className="menu mobile" size={26} />
          ) : (
            <MdMenu className="menu mobile" onClick={toggleMenu} size={28} />
          )}
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  showMenu: PropTypes.bool
};

Header.defaultProps = {
  showMenu: false
};

export default Header;
