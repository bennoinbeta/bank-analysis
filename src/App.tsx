import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAgile, useEvent } from '@agile-ts/react';
import { ThemeProvider } from 'styled-components';
import { ui } from './core';

import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './routing/AppRouter';
import AgileThemeProvider from './styles/theme/AgileThemeProvider';
import { FinalTheme } from './core/entities/ui/ui.types';

const App: React.FC = () => {
  const activeTheme = useAgile(ui.THEME_TYPE);

  // Handle UI-Events
  useEvent(ui.TOAST_EVENT, (payload) => {
    toast[payload.type](payload.message);
  });

  return (
    <AgileThemeProvider
      activeThemeKey={activeTheme as any}
      themes={{
        light: { theme: {} },
        dark: { theme: {} },
      }}>
      {(theme) => (
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
            theme={activeTheme as any}
          />
          <AppRouter />
        </ThemeProvider>
      )}
    </AgileThemeProvider>
  );
};

export default App;
