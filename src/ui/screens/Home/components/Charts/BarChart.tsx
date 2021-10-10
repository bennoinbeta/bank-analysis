import React from 'react';
import { Bar } from 'react-chartjs-2';

type Props = {
  data: any;
};

const BarChart: React.FC<Props> = (props) => {
  const { data } = props;
  return (
    <div>
      <Bar height={400} width={600} data={data} />
    </div>
  );
};

export default BarChart;
