import React from 'react';
import styled from '@emotion/styled';
import Icon from '../../../../../components/icons';
import { useAgileTheme } from '../../../../../../styles/theme';

const PlusIcon: React.FC = () => {
  const theme = useAgileTheme();

  return (
    <Container>
      <Icon.Plus color={theme.colors.layout.rHc} />
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
