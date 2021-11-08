import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from '@emotion/styled';

type Props = {
  data: any;
};

const BarChart: React.FC<Props> = (props) => {
  const { data } = props;

  return (
    <Container>
      <Bar data={data} />
    </Container>
  );
};

export default BarChart;

const Container = styled.div`
  position: relative;
  display: flex;
  flex: 1;

  margin: 50px 10px;
`;
