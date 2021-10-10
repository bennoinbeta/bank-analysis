import React from 'react';
import styled from 'styled-components';
import ThemeContext from '../../../context/ThemeContext';
import Icon from '../icons';
import { useSpring, animated } from '@react-spring/web';
import { useWindowSize } from '../../hooks/useWindowSize';

type Props = {
  isLoading?: boolean;
};

const DollarBackground: React.FC<Props> = (props) => {
  const { children, isLoading } = props;
  const theme = React.useContext(ThemeContext);
  const { windowWidth } = useWindowSize();

  const rotateAnimationProps = useSpring({
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
    loop: isLoading,
  });

  const scaleAnimationProps = useSpring({
    to: {
      position: isLoading ? 'relative' : 'absolute',
      top: 0,
      left: isLoading ? 0 : '-50%',

      width: isLoading ? 50 : windowWidth * 1.2,
      height: isLoading ? 50 : '100%',
      opacity: isLoading ? '100%' : '2%',
    },
  });

  return (
    <Container {...props}>
      <ChildrenContainer>{children}</ChildrenContainer>
      <RotateContainer {...rotateAnimationProps}>
        <BackgroundShape
          strokeWidth={1.1}
          color={theme.primitiveColors.white}
          {...scaleAnimationProps}
        />
      </RotateContainer>
    </Container>
  );
};

DollarBackground.defaultProps = {
  isLoading: false,
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

const RotateContainer = styled(animated.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundShape = styled(animated(Icon.DollarSign))`
  z-index: 0;

  transform: rotate(-90deg);
`;
