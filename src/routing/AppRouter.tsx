import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import FallbackScreen from '../ui/screens/404';
import ChartScreen from '../ui/screens/ChartScreen';
import HomeScreen from '../ui/screens/HomeScreen';
// Screens
import LegalScreen from '../ui/screens/LegalScreen';
import routingHistory from './history';

const AppRouter: React.FC = () => {
  return (
    <Router history={routingHistory}>
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>

        <Route path="/chart">
          <ChartScreen />
        </Route>

        <Route path="/legal">
          <LegalScreen />
        </Route>

        <Route path="*">
          <FallbackScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
