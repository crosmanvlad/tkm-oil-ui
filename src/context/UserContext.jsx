import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext({});

export default UserContext;

export const UserConsumer = UserContext.Consumer;

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  const updateUserContext = (_username, _role, _token) => {
    setUsername(_username);
    setRole(_role);
    setToken(_token);
  };

  return (
    <UserContext.Provider
      value={{
        username,
        role,
        token,
        updateUserContext
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
};
