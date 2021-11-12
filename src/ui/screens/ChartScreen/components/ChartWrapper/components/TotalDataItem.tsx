import React from 'react';
import styled from '@emotion/styled';
import Title from '../../../../../components/primitive/text/Title';
import { useAgileTheme } from '../../../../../../styles/theme';
import Text from '../../../../../components/primitive/text/Text';

const TotalDataItem: React.FC<Props> = (props) => {
  const theme = useAgileTheme();
  const {
    label,
    value,
    color = theme.colors.interactive.primary.p0,
    ...others
  } = props;

  return (
    <Container color={color} {...others}>
      <Text size={'md'} color={theme.colors.layout.rHc}>
        {label}
      </Text>
      <Title element={'h2'}>{value}€</Title>
    </Container>
  );
};

export default TotalDataItem;

type Props = {
  label: string;
  value: string | number;
  color?: string;
};

const Container = styled.div<{ color: string }>`
  padding: 10px 20px;

  background-color: ${({ color }) => color};
  border-color: ${({ color }) => color};
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
`;
