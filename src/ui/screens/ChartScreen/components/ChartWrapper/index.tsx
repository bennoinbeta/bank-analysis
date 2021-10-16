import React from 'react';
import { BankFileDataType } from '../../../../../core/entities/bank/bank.types';
import BarChart from '../charts/BarChart';
import { bank } from '../../../../../core';
import { useChartData } from '../../hooks/useChartData';

type Props = {
  data: BankFileDataType;
};

const ChartWrapper: React.FC<Props> = (props) => {
  const { data } = props;
  const chartData = useChartData(
    bank.getDataset(data, 'month')?.dataset,
    'creditDebitAmounts'
  );

  return <BarChart data={chartData} />;
};

export default ChartWrapper;
