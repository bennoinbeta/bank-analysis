import React from 'react';
import { TOAST_EVENT } from './core';
import { useEvent } from '@agile-ts/event';
import { toast, ToastContainer } from 'react-toastify';
import Home from './ui/screens/Home';
import styled from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App: React.FC = () => {
  useEvent(TOAST_EVENT, (payload) => {
    toast[payload.type](payload.message);
  });

  return (
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
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
`;
