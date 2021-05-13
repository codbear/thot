import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import APP_ROUTES from '../../constants';
import LoginScreen from '../../../Modules/user';

const ReactRouter = () => (
  <Router>
    <Switch>
      <Route path={APP_ROUTES.USER.LOGIN}>
        <LoginScreen />
      </Route>
    </Switch>
  </Router>
);

export default ReactRouter;
