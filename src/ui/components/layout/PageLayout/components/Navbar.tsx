import React from 'react';
import { useHistory } from 'react-router';
import styled from '@emotion/styled';
import { MAX_WIDTH } from '..';
import Icon from '../../../icons';
import { useAgileTheme } from '../../../../../styles/theme';

type Props = {
  absolute?: boolean;
};

const Navbar: React.FC<Props> = (props) => {
  const { absolute } = props;
  const theme = useAgileTheme();
  const history = useHistory();

  return (
    <Container absolute={absolute as any} maxWidth={MAX_WIDTH}>
      <LogoContainer
        onClick={() => {
          history.push('/');
        }}>
        <Icon.Logo color={theme.colors.layout.bg} width={30} height={30} />
        <AppName>Bank Analysis</AppName>
      </LogoContainer>
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

  padding: 20px;
  margin-left: auto;
  margin-right: auto;

  background-color: ${({ theme, absolute }) =>
    !absolute ? theme.colors.layout.bg : 'transparent'};
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  cursor: pointer;
`;

const AppName = styled.p`
  margin: 0 0 0 10px;

  font-size: 14px;

  color: ${({ theme }) => theme.colors.layout.hc};
`;
