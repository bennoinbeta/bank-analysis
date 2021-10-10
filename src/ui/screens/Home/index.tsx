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
      <BackgroundShapeContainer>
        <BackgroundShape
          width={'100%'}
          height={'100%'}
          strokeWidth={2}
          color={theme.primitiveColors.white}
        />
      </BackgroundShapeContainer>
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
  top: 0;
  left: 0;

  opacity: 5%;
  transform: rotate(-90deg);
`;

const BackgroundShapeContainer = styled.div`
  overflow: hidden;
`;
