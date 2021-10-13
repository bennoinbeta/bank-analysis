import React from 'react';
import { useEvent } from '@agile-ts/event';
import { toast, ToastContainer } from 'react-toastify';
import { useAgile } from '@agile-ts/react';
import { ThemeProvider } from 'styled-components';
import ThemeContext from './context/ThemeContext';
import { ui } from './core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LegalScreen from './ui/screens/LegalScreen';
import ChartScreen from './ui/screens/ChartScreen';
import HomeScreen from './ui/screens/HomeScreen';

import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  // Adding dark theme fallback,
  // because currently the Computed initial value is 'null'
  // before the first computition.
  // Will be fixed in the next AgileTs release ^^
  const theme = useAgile(ui.THEME) || ui.themes.dark;

  useEvent(ui.TOAST_EVENT, (payload) => {
    toast[payload.type](payload.message);
  });

  return (
    <Router>
      <ThemeContext.Provider value={theme}>
        <ThemeProvider theme={theme}>
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme.type as any}
          />

          <Switch>
            <Route path="/">
              <HomeScreen />
            </Route>

            <Route path="/chart">
              <ChartScreen />
            </Route>

            <Route path="/legal">
              <LegalScreen />
            </Route>
          </Switch>
        </ThemeProvider>
      </ThemeContext.Provider>
    </Router>
  );
};

export default App;
