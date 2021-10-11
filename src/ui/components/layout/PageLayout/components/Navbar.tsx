import React from 'react';
import styled from 'styled-components';
import { MAX_WIDTH } from '..';
import { useTheme } from '../../../../hooks/useTheme';
import Icon from '../../../icons';

type Props = {
  absolute?: boolean;
};

const Navbar: React.FC<Props> = (props) => {
  const { absolute } = props;
  const theme = useTheme();

  return (
    <Container absolute={absolute as any} maxWidth={MAX_WIDTH}>
      <Icon.Logo color={theme.colors.on_background} width={30} height={30}/>
      <AppName>Bank Analysis</AppName>
    </Container>
  );
};

Navbar.defaultProps = {
  absolute: true,
};

export default Navbar;

const Container = styled.div<{ absolute: boolean; maxWidth: number }>`
  position: ${({ absolute }) => (absolute ? 'absolute' : 'relative')};
  top: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  max-width: ${({ maxWidth }) => maxWidth}px;
  width: 100%;

  padding: 20px 0;
  margin-left: auto;
  margin-right: auto;

  background-color: ${({ theme, absolute }) =>
    !absolute ? theme.colors.background : 'transparent'};
`;

const AppName = styled.p`
  margin: 0 0 0 10px;

  font-size: 14px;

  color: ${({ theme }) => theme.colors.on_background};
`;
