import React from 'react';

import styled from '@emotion/styled';

import { useAgileTheme } from '../../../../../../styles/theme';
import Icon from '../../../../../components/icons';

const PlusIcon: React.FC = () => {
  const theme = useAgileTheme();

  return (
    <Container>
      <Icon.Plus color={theme.colors.layout.rHc} width={24} height={24} />
    </Container>
  );
};

export default PlusIcon;

const Container = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  border: 2px solid ${({ theme }) => theme.colors.layout.rHc};
  border-radius: 5px;
`;
