import React from 'react';
import styled from 'styled-components';
import ThemeContext from '../../../context/ThemeContext';
import Icon from '../../components/icons';
import DropZone from './components/DropZone';
import { onDrop } from './controller';

const Home: React.FC = () => {
  const theme = React.useContext(ThemeContext);

  return (
    <Container>
      <DropZone onDrop={onDrop} />
      <BackgroundShape width={1000} height={1000} strokeWidth={2} color={theme.primitiveColors.white} />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const BackgroundShape = styled(Icon.DollarSign)`
  position: absolute;

  opacity: 0.02%;
  transform: rotate(-90deg);
`;
