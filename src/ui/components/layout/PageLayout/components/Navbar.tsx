import React from 'react';
import { useHistory } from 'react-router';
import styled from '@emotion/styled';
import Icon from '../../../icons';
import { useAgileTheme } from '../../../../../styles/theme';
import Text from '../../../primitive/text/Text';
import {
  MAX_WIDTH,
  NAVBAR_HEIGHT,
} from '../../../../../core/entities/ui/ui.controller';

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
        <Icon.Logo color={theme.colors.layout.hc} width={30} height={30} />
        <AppName size={'md'}>Bank Analysis</AppName>
      </LogoContainer>
    </Container>
  );
};

Navbar.defaultProps = {
  absolute: true,
};

export default Navbar;

type Props = {
  absolute?: boolean;
};

const Container = styled.div<{ absolute: boolean; maxWidth: number }>`
  position: ${({ absolute }) => (absolute ? 'absolute' : 'relative')};
  top: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  max-width: ${({ maxWidth }) => maxWidth}px;
  width: 100%;
  height: ${NAVBAR_HEIGHT}px;

  padding: 20px 0;
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

const AppName = styled(Text)`
  margin: 0 0 0 10px;

  color: ${({ theme }) => theme.colors.layout.hc};
`;
