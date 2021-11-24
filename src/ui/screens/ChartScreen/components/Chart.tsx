import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

import styled from '@emotion/styled';

import Text from '../../../components/primitive/text/Text';

const Chart: React.FC<Props> = (props) => {
  const { data, type = 'line' } = props;

  const chartComponentKeyMap = {
    line: <Line data={data} />,
    bar: <Bar data={data} />,
  };

  return (
    <Container>
      {['line', 'bar'].includes(type) ? (
        chartComponentKeyMap[type]
      ) : (
        <Text>Invalid Chart type '{type}' provided!</Text>
      )}
    </Container>
  );
};

export default Chart;

type Props = {
  data: any;
  type?: ChartTypes;
};

export type ChartTypes = 'bar' | 'line';

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;

  margin: 50px 10px;
`;
