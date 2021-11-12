import React from 'react';
import { useAgile } from '@agile-ts/react';
import { ui } from '../../../core';
import PageLayout from '../../components/layout/PageLayout';
import DropZone from './components/DropZone';
import { onDrop } from './controller';
import styled from '@emotion/styled';

const HomeScreen: React.FC = () => {
  const isLoading = useAgile(ui.IS_LOADING, { key: 'HomeScreen' });

  return (
    <PageLayout isLoading={isLoading}>
      {!isLoading && (
        <Container>
          <DropZone onDrop={onDrop} />
        </Container>
      )}
    </PageLayout>
  );
};

export default HomeScreen;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
