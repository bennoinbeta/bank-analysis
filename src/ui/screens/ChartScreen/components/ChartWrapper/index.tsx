import React from 'react';
import { BankFileDataType } from '../../../../../core/entities/bank/bank.types';
import BarChart from '../charts/BarChart';
import { bank } from '../../../../../core';
import { useChartData } from '../../hooks/useChartData';
import Title from '../../../../components/primitive/text/Title';
import Text from '../../../../components/primitive/text/Text';
import NativeSelect from '../../../../components/primitive/inputs/NativeSelect';
import styled from '@emotion/styled';
import AddButton from './components/AddButton';

const ChartWrapper: React.FC<Props> = (props) => {
  const { data } = props;
  const chartData = useChartData(
    bank.getDataset(data, 'month')?.dataset,
    'creditDebitAmounts'
  );

  return (
    <Container>
      <HeaderContainer>
        <LeftHeaderContainer>
          <SubTitle size={'xl'}>{data.name}</SubTitle>
          <Title>Dashboard</Title>
        </LeftHeaderContainer>
        <RightHeaderContainer>
          <FileSelect data={[{ label: 'test', value: 'test' }]} size={'sm'} />
          <AddButton />
        </RightHeaderContainer>
      </HeaderContainer>

      <TypeSelect data={[{ label: 'test', value: 'test' }]} size={'md'} />

      <Divider />

      <div></div>
      <BarChart data={chartData} />
    </Container>
  );
};

export default ChartWrapper;

type Props = {
  data: BankFileDataType;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  margin-top: 120px;

  background-color: rebeccapurple;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0 20px 0;

  background-color: blue;
`;

const LeftHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: red;
`;

const SubTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.layout.p};
`;

const RightHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  background-color: #61dafb;
`;

const FileSelect = styled(NativeSelect)`
  max-width: 200px;
  min-width: 100px;

  margin-right: 10px;
`;

const TypeSelect = styled(NativeSelect)`
  max-width: 200px;
  min-width: 100px;
`;

const Divider = styled.div`
  // todo
`;
