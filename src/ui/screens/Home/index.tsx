import { useAgile } from '@agile-ts/react';
import React from 'react';
import styled from 'styled-components';
import { ui } from '../../../core';
import DollarBackground from '../../components/layout/DollarBackground';
import DropZone from './components/DropZone';
import { onDrop } from './controller';

const Home: React.FC = () => {
  const isLoading = useAgile(ui.IS_LOADING);

  return (
    <Container isLoading={isLoading}>
      {!isLoading && <DropZone onDrop={onDrop} />}
    </Container>
  );
};

export default Home;

const Container = styled(DollarBackground)`
  align-items: center;
  justify-content: center;
`;
