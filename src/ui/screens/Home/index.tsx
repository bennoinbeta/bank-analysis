import { useAgile } from '@agile-ts/react';
import React from 'react';
import styled from 'styled-components';
import { ui } from '../../../core';
import PageLayout from '../../components/layout/PageLayout';
import BarChart from './components/Charts/BarChart';
import DropZone from './components/DropZone';
import { onDrop } from './controller';

const Home: React.FC = () => {
  const [isLoading, showGrraph] = useAgile([ui.IS_LOADING, ui.SHOW_GRAP]);

  return (
    <PageLayout isLoading={isLoading}>
      <Container>
        {!isLoading && (showGrraph ? (
          <BarChart
            data={{
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [
                {
                  label: '# of Votes',
                  data: [12, 19, 3, 5, 2, 3],
                  backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                  ],
                  borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                  ],
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
            }}
          />
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
