import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAgile, useEvent } from '@agile-ts/react';
import { ThemeProvider } from 'styled-components';
import ThemeContext from './context/ThemeContext';
import { ui } from './core';

import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './routing/AppRouter';

const App: React.FC = () => {
  const theme = useAgile(ui.THEME);

  // Handle UI-Events
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
        <AppRouter />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;
