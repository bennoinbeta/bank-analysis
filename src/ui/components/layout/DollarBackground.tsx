import React from 'react';
import styled from '@emotion/styled';
import Icon from '../icons';
import { useSpring, animated } from '@react-spring/web';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useAgileTheme } from '../../../styles/theme';

type Props = {
  isLoading?: boolean;
};

const DollarBackground: React.FC<Props> = (props) => {
  const { children, isLoading } = props;
  const theme = useAgileTheme();
  const { windowWidth } = useWindowSize();

  const rotateAnimationProps = useSpring({
    from: {
      rotate: 0,
    },
    to: {
      rotate: 360,
    },
    loop: isLoading,
    cancel: !isLoading,
    reset: !isLoading,
  });

  const scaleAnimationProps = useSpring({
    to: {
      width: isLoading ? 50 : (windowWidth || 0) * 1.2,
      height: '100%',
      opacity: isLoading ? '100%' : '2%',
    },
  });

  return (
    <Container {...props}>
      <ChildrenContainer>{children}</ChildrenContainer>
      <RotateContainer
        style={{
          // https://github.com/pmndrs/react-spring/issues/875
          transform: isLoading
            ? rotateAnimationProps.rotate.to((r) => `rotate(${r}deg)`)
            : undefined,
          position: 'absolute',
        }}>
        <BackgroundShape
          strokeWidth={1.1}
          color={theme.colors.layout.p}
          {...scaleAnimationProps}
        />
      </RotateContainer>
      {isLoading && <LoadingText>Loading..</LoadingText>}
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

  align-items: center;
  justify-content: center;
  flex-direction: column;

  overflow: hidden;
`;

const ChildrenContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;

  z-index: 1;
`;

const RotateContainer = styled(animated.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundShape = styled(animated(Icon.DollarSign))`
  position: relative;

  z-index: 0;

  transform: rotate(-90deg);
`;

const LoadingText = styled.p`
  position: absolute;
  margin-top: 90px; // TODO find better way to place text below absolute view

  font-size: 12px;

  color: ${({ theme }) => theme.colors.layout.rHc};
`;
