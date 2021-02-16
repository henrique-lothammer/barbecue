import React, { useEffect, useContext } from 'react';
import {
  Switch, Route, useLocation, useHistory,
} from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

import Dashboard from '../pages/dashboard';
import Barbecue from '../pages/barbecue';
import Login from '../pages/login';

const Routes = () => {
  const history = useHistory();
  const { logged } = useContext(AuthContext);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!logged && pathname !== '/login') {
      history.push('/login');
    }
    if (logged && pathname === '/login') {
      history.push('/');
    }
  }, [pathname, logged]);

  return (
    <Switch>
      <Route path="/login" component={Login} />

      <Route path="/" exact component={Dashboard} />
      <Route path="/barbecue/:id" component={Barbecue} />
    </Switch>
  );
};

export default Routes;
