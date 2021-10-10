import React from 'react';
import styled from 'styled-components';
import ThemeContext from '../../../context/ThemeContext';
import Icon from '../icons';
import { useSpring, animated } from '@react-spring/web';

type Props = {
  isLoading?: boolean;
};

const DollarBackground: React.FC<Props> = (props) => {
  const { children, isLoading } = props;
  const theme = React.useContext(ThemeContext);

  const animationProps = useSpring({
    loop: isLoading,
    to: { width: isLoading ? 20 : '200%', height: isLoading ? 20 : '200%' },
  });

  return (
    <Container {...props}>
      <ChildrenContainer>{children}</ChildrenContainer>
      <BackgroundShape
        strokeWidth={1.1}
        color={theme.primitiveColors.white}
        {...animationProps}
      />
    </Container>
  );
};

DollarBackground.defaultProps = {
    isLoading: false
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

const BackgroundShape = styled(animated(Icon.DollarSign))`
  position: absolute;
  top: 0;
  left: -50%;

  z-index: 0;

  opacity: 2%;
  transform: rotate(-90deg);
`;
