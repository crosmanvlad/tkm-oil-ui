import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TOKEN, ROLE, ADMIN } from '../../utils/constants';
import { getCookie } from '../../utils/cookie-handler';

const Menu = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (getCookie(TOKEN)) {
      setIsLogged(true);
      if (getCookie(ROLE) === ADMIN) {
        setIsAdmin(true);
      }
    }
  });

  return (
    <>
      {isLogged && (
        <div className="tkm-oil-menu">
          {isAdmin && <Link to="/overview" />}
          <Link to="/my-collections" />
        </div>
      )}
    </>
  );
};

export default Menu;
