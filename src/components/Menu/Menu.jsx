import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TOKEN, ROLE, ADMIN } from '../../utils/constants';
import { getCookie } from '../../utils/cookie-handler';
import UserContext from '../../context/UserContext';
import './Menu.scss';

const Menu = ({ toggleMenu, showMenu }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    if (getCookie(TOKEN)) {
      setIsLogged(true);
      if (getCookie(ROLE) === ADMIN) {
        setIsAdmin(true);
      }
    }
  }, [user]);

  return (
    <>
      {isLogged && (
        <div className={`tkm-oil-menu ${showMenu ? '' : 'hidden'}`}>
          {isAdmin && (
            <Link onClick={toggleMenu} to="/overview">
              Toate colectarile
            </Link>
          )}
          <Link onClick={toggleMenu} to="/my-collections">
            Colectarile mele
          </Link>
        </div>
      )}
    </>
  );
};

Menu.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  showMenu: PropTypes.bool
};

Menu.defaultProps = {
  showMenu: false
};

export default Menu;
