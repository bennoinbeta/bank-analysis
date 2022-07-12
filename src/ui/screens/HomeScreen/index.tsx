import React from 'react';

import { useAgile } from '@agile-ts/react';
import styled from '@emotion/styled';

import { bank, ui } from '../../../core';
import { BANK_DATA } from '../../../core/entities/bank/bank.controller';
import routingHistory from '../../../routing/history';
import PageLayout from '../../components/layout/PageLayout';
import Switch from '../../components/primitive/buttons/Switch';
import Text from '../../components/primitive/text/Text';
import DropZone from './components/DropZone';
import { onDrop } from './controller';

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
            <DropZoneFooter>
              <PersistSwitch
                checked={isBankDataPersisted}
                onChange={(event) =>
                  bank.IS_PERSISTED.set(event.currentTarget.checked)
                }
                label={'Persist bank data'}
              />
              <ExampleButton
                onClick={() => {
                  // TODO get file

                  const response = fetch(
                    'https://raw.githubusercontent.com/bennodev19/bank-analysis/master/static/example-csv-data.csv'
                  );
                  console.log({ response });

                  // onDrop()
                }}
                size={'xs'}>
                Example
              </ExampleButton>
            </DropZoneFooter>
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

const DropZoneFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PersistSwitch = styled(Switch)`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  padding: 0 10px;
`;

const ExampleButton = styled(Text)`
  margin-top: ${({ theme }) => theme.spacing.sm}px;
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.layout.hc};

  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.interactive.primary.pM2};
  }
`;