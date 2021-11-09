import React from 'react';
import styled from '@emotion/styled';
import { MAX_WIDTH } from '..';
import routingHistory from '../../../../../routing/history';
import Text from '../../../primitive/text/Text';

type Props = {
  absolute?: boolean;
};

const Footer: React.FC<Props> = (props) => {
  const { absolute } = props;
  const goToLegalPage = () => routingHistory.push('/legal');

  return (
    <Container absolute={absolute as any} maxWidth={MAX_WIDTH}>
      <RightsReservedText transform={'uppercase'} size={'xs'}>
        ©2021 BennoDev all rights reserved.
      </RightsReservedText>
      <LegalButton onClick={goToLegalPage} size={'xs'}>
        LEGAL
      </LegalButton>
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
    !absolute ? theme.colors.layout.p : 'transparent'};
`;

const RightsReservedText = styled(Text)`
  margin: 0 10px 0 0;
  color: ${({ theme }) => theme.colors.layout.rHc};
`;

const LegalButton = styled(Text)`
  margin: 0 10px 0 0;
  color: ${({ theme }) => theme.colors.layout.hc};

  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.interactive.primary.pM2};
  }
`;
