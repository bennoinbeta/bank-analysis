import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LegalScreen from '../ui/screens/LegalScreen';
import ChartScreen from '../ui/screens/ChartScreen';
import HomeScreen from '../ui/screens/HomeScreen';
import FallbackScreen from '../ui/screens/404';

const AppRouter: React.FC = () => {
  return (
    <Router history={history}>
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
