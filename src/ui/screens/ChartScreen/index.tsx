import React from 'react';
import { useAgile } from '@agile-ts/react';
import styled from '@emotion/styled';
import { BANK_DATA } from '../../../core/entities/bank/bank.controller';
import { IS_LOADING } from '../../../core/entities/ui/ui.controller';
import routingHistory from '../../../routing/history';
import PageLayout from '../../components/layout/PageLayout';
import ChartWrapper from './components/ChartWrapper';

const ChartScreen: React.FC = () => {
  const [isLoading, bankData] = useAgile([IS_LOADING, BANK_DATA]);
  const [canShowBankData, setCanShowBankData] = React.useState(false);
  const [waitTimeout, setWaitTimeout] = React.useState<NodeJS.Timeout | null>(
    null
  );
  const [bankDataIndex, setBankDataIndex] = React.useState(0);

  React.useEffect(() => {
    // Check whether bank data was loaded
    if (bankData.length <= 0) {
      if (waitTimeout == null) {
        // Redirect to homepage if no bank data could be loaded
        setWaitTimeout(
          setTimeout(() => {
            if (bankData.length <= 0) {
              routingHistory.push('/');
            } else {
              setCanShowBankData(true);
            }
          }, 3000)
        );
      }
    } else {
      setCanShowBankData(true);
    }

    return () => {
      if (waitTimeout != null) {
        clearTimeout(waitTimeout);
        setWaitTimeout(null);
      }
    };
  }, []);

  if (!canShowBankData) return <PageLayout isLoading={true} />;

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
