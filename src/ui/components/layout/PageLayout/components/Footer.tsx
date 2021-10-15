import React from 'react';
import styled from 'styled-components';
import { MAX_WIDTH } from '..';
import routingHistory from '../../../../../routing/history';

type Props = {
  absolute?: boolean;
};

const Footer: React.FC<Props> = (props) => {
  const { absolute } = props;
  const goToLegalPage = () => routingHistory.push('/legal');

  return (
    <Container absolute={absolute as any} maxWidth={MAX_WIDTH}>
      <RightsReservedText>
        ©2021 BENNODEV ALL RIGHTS RESERVED.
      </RightsReservedText>
      <LegalButton onClick={goToLegalPage}>LEGAL</LegalButton>
    </Container>
  );
};

Footer.defaultProps = {
  absolute: true,
};

export default Footer;

const Container = styled.div<{ absolute: boolean; maxWidth: number }>`
  position: ${({ absolute }) => (absolute ? 'absolute' : 'relative')};
  bottom: 0;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  max-width: ${({ maxWidth }) => maxWidth}px;
  width: 100%;

  padding: 20px;
  margin-left: auto;
  margin-right: auto;

  background-color: ${({ theme, absolute }) =>
    !absolute ? theme.colors.background : 'transparent'};
`;

const RightsReservedText = styled.p`
  margin: 0 10px 0 0;
  color: ${({ theme }) => theme.colors.on_background_2};
  font-size: 12px;
`;

const LegalButton = styled.p`
  margin: 0 10px 0 0;
  color: ${({ theme }) => theme.colors.on_background};
  font-size: 12px;

  cursor: pointer;
`;
