import React from 'react';
import { useAgile } from '@agile-ts/react';
import { BANK_DATA } from '../../../core/entities/bank/bank.controller';
import { IS_LOADING } from '../../../core/entities/ui/ui.controller';
import routingHistory from '../../../routing/history';
import PageLayout from '../../components/layout/PageLayout';
import ChartWrapper from './components/ChartWrapper';

const ChartScreen: React.FC = () => {
  const [isLoading, bankData] = useAgile([IS_LOADING, BANK_DATA]);
  const [loadedBankData, setLoadedBankData] = React.useState(false);

  // Check whether bank data was loaded
  React.useEffect(() => {
    if (BANK_DATA.value.length <= 0) {
      routingHistory.push('/');
    } else {
      setLoadedBankData(true);
    }
  }, [BANK_DATA.value.length]);

  if (!loadedBankData) return <PageLayout isLoading={true} />;

  return (
    <PageLayout isLoading={isLoading}>
      {!isLoading && <ChartWrapper data={bankData} />}
    </PageLayout>
  );
};

export default ChartScreen;
