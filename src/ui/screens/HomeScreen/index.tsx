import { useAgile } from '@agile-ts/react';
import React from 'react';
import styled from 'styled-components';
import { ui } from '../../../core';
import PageLayout from '../../components/layout/PageLayout';
import DropZone from './components/DropZone';
import { onDrop } from './controller';

const HomeScreen: React.FC = () => {
  const isLoading = useAgile(ui.IS_LOADING);

  return (
    <PageLayout isLoading={isLoading}>
      <Container>{!isLoading && <DropZone onDrop={onDrop} />}</Container>
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
