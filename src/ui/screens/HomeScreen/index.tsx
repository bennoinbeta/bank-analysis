import React, { useEffect } from 'react';
import { useAgile } from '@agile-ts/react';
import { bank, ui } from '../../../core';
import PageLayout from '../../components/layout/PageLayout';
import DropZone from './components/DropZone';
import { onDrop } from './controller';
import styled from '@emotion/styled';
import Switch from '../../components/primitive/buttons/Switch';
import { BANK_DATA } from '../../../core/entities/bank/bank.controller';
import routingHistory from '../../../routing/history';

const HomeScreen: React.FC = () => {
  const [isLoading, isBankDataPersisted] = useAgile(
    [ui.IS_LOADING, bank.IS_PERSISTED],
    { key: 'HomeScreen' }
  );

  // Check whether bank data was loaded
  React.useEffect(() => {
    if (BANK_DATA.value.length > 0) {
      routingHistory.push('/chart');
    }
  }, [BANK_DATA.value.length]);

  return (
    <PageLayout isLoading={isLoading}>
      {!isLoading && (
        <Container>
          <div>
            <DropZone onDrop={onDrop} />
            <PersistSwitch
              checked={isBankDataPersisted}
              onChange={(event) =>
                bank.IS_PERSISTED.set(event.currentTarget.checked)
              }
              label={'Persist bank data'}
            />
          </div>
        </Container>
      )}
    </PageLayout>
  );
};

export default HomeScreen;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PersistSwitch = styled(Switch)`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  padding: 0 10px;
`;
