import { useAgile } from '@agile-ts/react';
import React from 'react';
import styled from 'styled-components';
import { ui } from '../../../core';
import bank from '../../../core/entities/bank';
import { BANK_DATA } from '../../../core/entities/bank/bank.controller';
import PageLayout from '../../components/layout/PageLayout';
import BarChart from './components/Charts/BarChart';
import DropZone from './components/DropZone';
import { onDrop } from './controller';

const Home: React.FC = () => {
  const [isLoading, showGrraph, bankData] = useAgile([
    ui.IS_LOADING,
    ui.SHOW_GRAP,
    BANK_DATA,
  ]);

  const getGraphDataset = () => {
    const monthDataset = bank.getMonthDataset(bankData[0]);

    console.log(monthDataset);

    return {
      labels: monthDataset?.labels,
      datasets: [
        {
          label: 'Money',
          data: monthDataset?.data,
          backgroundColor: monthDataset?.backgroundColors,
          borderColor: monthDataset?.borderColors,
          borderWidth: 1,
        },
      ],
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  };

  return (
    <PageLayout isLoading={isLoading}>
      <Container>
        {!isLoading &&
          (showGrraph ? (
            <BarChart data={getGraphDataset()} />
          ) : (
            <DropZone onDrop={onDrop} />
          ))}
      </Container>
    </PageLayout>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
