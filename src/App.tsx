import React from 'react';
import { useEvent } from '@agile-ts/event';
import { toast, ToastContainer } from 'react-toastify';
import { useAgile } from '@agile-ts/react';
import { ThemeProvider } from 'styled-components';
import ThemeContext from './context/ThemeContext';
import { ui } from './core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Legal from './ui/screens/Legal';
import Graph from './ui/screens/Graph';
import Home from './ui/screens/Home';

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

        <Router>
          <Switch>
            <Route path="/">
              <Home />
            </Route>

            <Route path="/chart">
              <Graph />
            </Route>

            <Route path="/legal">
              <Legal />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
