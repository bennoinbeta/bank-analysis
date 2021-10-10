import React from 'react';
import styled from 'styled-components';
import ThemeContext from '../../../../../../context/ThemeContext';
import Icon from '../../../../../components/icons';

const PlusIcon: React.FC = () => {
  const theme = React.useContext(ThemeContext);

  return (
    <Container>
      <Icon.Plus color={theme.colors.on_surface_3} />
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

  border: 2px solid ${({ theme }) => theme.colors.on_surface_3};
  border-radius: 5px;
`;
