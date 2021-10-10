import React from 'react';
import { useEvent } from '@agile-ts/event';
import { toast, ToastContainer } from 'react-toastify';
import { useAgile } from '@agile-ts/react';
import Home from './ui/screens/Home';
import styled, { ThemeProvider } from 'styled-components';
import ThemeContext from './context/ThemeContext';
import { ui } from './core';

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
        <Container>
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
          />
          <Home />
        </Container>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;
