import { useAgile } from '@agile-ts/react';
import React from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import { BANK_DATA } from '../../../core/entities/bank/bank.controller';
import { IS_LOADING } from '../../../core/entities/ui/ui.controller';
import PageLayout from '../../components/layout/PageLayout';
import ChartWrapper from './components/ChartWrapper.tsx';

const ChartScreen: React.FC = () => {
  const [isLoading, bankData] = useAgile([IS_LOADING, BANK_DATA]);
  const [bankDataIndex, setBankDataIndex] = React.useState(0);

  // Redirect to homepage if no bank data specified
  if (bankData.length <= 0) return <Redirect to="/" />;

  const currentBankData = bankData[bankDataIndex];

  return (
    <PageLayout isLoading={isLoading}>
      {!isLoading && (
        <Container>
          <ChartWrapper data={currentBankData} />
          <p>{currentBankData.name}</p>
        </Container>
      )}
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
