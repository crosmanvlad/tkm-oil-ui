import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getCookie } from './utils/cookie-handler';
import { TOKEN, ROLE, ADMIN } from './utils/constants';
import Login from './components/Login/Login';
import Overview from './components/Overview/Overview';
import MyCollections from './components/MyCollections/MyCollections';
import NewCollection from './components/NewCollection/NewCollection';
import UserList from './components/UserList/UserList';
import NewUser from './components/NewUser/NewUser';
import User from './components/User/User';

const Routes = () => {
  const loginRedirect = () => {
    if (getCookie(ROLE) === ADMIN) {
      return <Redirect to="/overview" />;
    }
    return <Redirect to="/my-collections" />;
  };

  const logoutRedirect = () => {
    return <Redirect to="/login" />;
  };

  const restrictedRute = (component) => {
    if (getCookie(ROLE) === ADMIN) {
      return component;
    }
    return <Redirect to="/new-collection" />;
  };

  return (
    <Switch>
      <Route exact path="/login" render={() => (getCookie(TOKEN) ? loginRedirect() : <Login />)} />
      <Route
        exact
        path="/overview"
        render={() => (getCookie(TOKEN) ? restrictedRute(<Overview />) : logoutRedirect())}
      />
      <Route exact path="/my-collections" render={() => (getCookie(TOKEN) ? <MyCollections /> : logoutRedirect())} />
      <Route exact path="/new-collection" render={() => (getCookie(TOKEN) ? <NewCollection /> : logoutRedirect())} />
      <Route exact path="/users" render={() => (getCookie(TOKEN) ? restrictedRute(<UserList />) : logoutRedirect())} />
      <Route
        exact
        path="/new-user"
        render={() => (getCookie(TOKEN) ? restrictedRute(<NewUser />) : logoutRedirect())}
      />
      <Route
        exact
        path="/user/:userId"
        render={() => (getCookie(TOKEN) ? restrictedRute(<User />) : logoutRedirect())}
      />
      <Route exact>
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};

export default Routes;
