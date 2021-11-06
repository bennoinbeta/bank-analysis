import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAgile, useEvent } from '@agile-ts/react';
import { ThemeProvider } from 'styled-components';
import core, { ui } from './core';

import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './routing/AppRouter';
import AgileThemeProvider from './styles/theme/AgileThemeProvider';

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
        [core.ui.themes.light.type]: core.ui.themes.light.theme,
        [core.ui.themes.dark.type]: core.ui.themes.dark.theme,
      }}>
      {(theme) => (
        <ThemeProvider theme={theme as any}>
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
