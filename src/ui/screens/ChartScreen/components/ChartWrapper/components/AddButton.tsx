import React from 'react';
import styled from '@emotion/styled';
import { useAgileTheme } from '../../../../../../styles/theme';
import Icon from '../../../../../components/icons';

const AddButton: React.FC<Props> = (props) => {
  const { onClick } = props;
  const theme = useAgileTheme();

  return (
    <Container onClick={onClick}>
      <Icon.Plus color={theme.colors.layout.rHc} width={24} height={24} />
    </Container>
  );
};

export default AddButton;

type Props = {
  onClick?: React.DOMAttributes<HTMLDivElement>['onClick'];
};

const Container = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  cursor: pointer;

  width: 50px;
  height: 50px;

  border: 2px solid ${({ theme }) => theme.colors.layout.rHc};
  border-radius: 5px;

  transition: all 200ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.layout.p};
  }
`;
