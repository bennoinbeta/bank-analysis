import React from 'react';
import { useEvent } from '@agile-ts/event';
import { toast, ToastContainer } from 'react-toastify';
import Home from './ui/screens/Home';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import ThemeContext from './context/ThemeContext';
import { ui } from './core';

import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const theme = ui.THEME.value;

  useEvent(ui.TOAST_EVENT, (payload) => {
    toast[payload.type](payload.message);
  });

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeProvider theme={theme}>
        <GlobalStyles/>
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
  background-color: ${({theme}) => theme.colors.background};
`;

const GlobalStyles = createGlobalStyle`
html,
body {
  margin: 0px;
  padding: 0px;
  height: 100%;
}
`;
