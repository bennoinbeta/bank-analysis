import React from 'react';
import styled from 'styled-components';
import ThemeContext from '../../../context/ThemeContext';
import Icon from '../icons';

const DollarBackground: React.FC = (props) => {
  const { children } = props;
  const theme = React.useContext(ThemeContext);

  return (
    <Container {...props}>
      <ChildrenContainer>{children}</ChildrenContainer>
      <BackgroundShape
        width={'200%'}
        height={'200%'}
        strokeWidth={1.1}
        color={theme.primitiveColors.white}
      />
    </Container>
  );
};

export default DollarBackground;

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const ChildrenContainer = styled.div`
  z-index: 1;
`;

const BackgroundShape = styled(Icon.DollarSign)`
  position: absolute;
  top: 0;
  left: -50%;

  z-index: 0;

  opacity: 5%;
  transform: rotate(-90deg);
`;
