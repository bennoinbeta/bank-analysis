import { useAgile } from '@agile-ts/react';
import React from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { bank } from '../../../core';
import { BANK_DATA } from '../../../core/entities/bank/bank.controller';
import { IS_LOADING } from '../../../core/entities/ui/ui.controller';
import PageLayout from '../../components/layout/PageLayout';
import BarChart from './components/Charts/BarChart';
import { useMonthGraphData } from './hooks/useMonthGraphData';

const ChartScreen: React.FC = () => {
  const [isLoading, bankData] = useAgile([IS_LOADING, BANK_DATA]);
  const chartData = useMonthGraphData(
    bankData.length > 0 ? bank.getMonthDataset(bankData[0]) : null
  );

  if (bankData.length === 0) return <Redirect to="/" />;

  return (
    <PageLayout isLoading={isLoading}>
      <Container>{!isLoading && <BarChart data={chartData} />}</Container>
    </PageLayout>
  );
};

export default ChartScreen;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
