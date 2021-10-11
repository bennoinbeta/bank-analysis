import { type } from 'os';
import React from 'react';
import styled from 'styled-components';

type Props = {
  absolute?: boolean;
};

const Footer: React.FC<Props> = (props) => {
  const { absolute } = props;

  return (
    <Container absolute={absolute as any}>
      <RightsReservedText>
        ©2021 BENNODEV ALL RIGHTS RESERVED.
      </RightsReservedText>
    </Container>
  );
};

Footer.defaultProps = {
  absolute: true,
};

export default Footer;

const Container = styled.div<{ absolute: boolean }>`
  position: ${({ absolute }) => (absolute ? 'absolute' : 'relative')};
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  width: 100%;
  padding: 10px 0;

  background-color: ${({ theme, absolute }) =>
    !absolute ? theme.colors.background : 'transparent'};
`;

const RightsReservedText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.on_background_2};
  font-size: 12px;
`;
