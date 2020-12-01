import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { getCookie } from './utils/cookie-handler';
import { TOKEN, ROLE, ADMIN } from './utils/constants';
import Login from './components/Login/Login';
import Overview from './components/Overview/Overview';
import MyCollections from './components/MyCollections/MyCollections';
import NewCollection from './components/NewCollection/NewCollection';

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

  const goToOverview = () => {
    if (getCookie(ROLE) === ADMIN) {
      return <Overview />;
    }
    return <Redirect to="/my-collections" />;
  };

  return (
    <Switch>
      <Route exact path="/login" render={() => (getCookie(TOKEN) ? loginRedirect() : <Login />)} />
      <Route exact path="/overview" render={() => (getCookie(TOKEN) ? goToOverview() : logoutRedirect())} />
      <Route exact path="/my-collections" render={() => (getCookie(TOKEN) ? <MyCollections /> : logoutRedirect())} />
      <Route exact path="/new-collection" render={() => (getCookie(TOKEN) ? <NewCollection /> : logoutRedirect())} />
      <Route exact>
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};

export default Routes;
