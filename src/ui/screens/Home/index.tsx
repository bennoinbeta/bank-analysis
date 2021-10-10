import React from 'react';
import styled from 'styled-components';
import DollarBackground from '../../components/layout/DollarBackground';
import DropZone from './components/DropZone';
import { onDrop } from './controller';

const Home: React.FC = () => {
  return (
    <Container isLoading={true}>
      {/* <DropZone onDrop={onDrop} /> */}
    </Container>
  );
};

export default Home;

const Container = styled(DollarBackground)`
  align-items: center;
  justify-content: center;
`;
