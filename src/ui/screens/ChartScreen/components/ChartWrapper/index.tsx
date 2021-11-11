import React, { useEffect, useState } from 'react';
import {
  BankFileDataType,
  DatasetFormat,
  TimeFormat,
} from '../../../../../core/entities/bank/bank.types';
import { bank } from '../../../../../core';
import { useChartData } from '../../hooks/useChartData';
import Title from '../../../../components/primitive/text/Title';
import Text from '../../../../components/primitive/text/Text';
import NativeSelect from '../../../../components/primitive/inputs/NativeSelect';
import styled from '@emotion/styled';
import AddButton from './components/AddButton';
import BarChart from '../charts/BarChart';
import { NAVBAR_HEIGHT } from '../../../../../core/entities/ui/ui.controller';
import { onAddFiles } from './controller';

const ChartWrapper: React.FC<Props> = (props) => {
  const { data } = props;

  const [timeFormat, setTimeFormat] = useState<TimeFormat>('month');
  const [selectedDatasetIndex, setSelectedDatasetIndex] = useState(0);
  const [datasetFormat, setDatasetFormat] =
    useState<DatasetFormat>('creditDebitAmounts');

  // Select Datasets
  const selectedDatasetSelectData = data
    .map((value, index) => {
      return {
        label: value.name,
        identifier: `${value.name}_${value.parseTimestamp}`,
        value: index.toString(),
      };
    })
    .reverse();
  const timeFormatSelectData = [
    { label: 'Day', value: 'day' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
  ];
  const datasetFormatSelectData = [
    { label: 'Credit/Debit Amounts', value: 'creditDebitAmounts' },
    { label: 'End Amounts', value: 'endAmounts' },
  ];

  const selectedDataset = data[selectedDatasetIndex];

  const chartData = useChartData(
    bank.getDataset(selectedDataset, timeFormat)?.dataset,
    datasetFormat
  );

  // When adding new data, select the latest added data
  useEffect(() => {
    setSelectedDatasetIndex(data.length - 1);
  }, [data.length]);

  return (
    <Container>
      <HeaderContainer>
        <LeftHeaderContainer>
          <SubTitle size={'lg'}>
            {selectedDataset.name.substring(
              0,
              selectedDataset.name.lastIndexOf('.')
            )}
          </SubTitle>
          <Title>Dashboard</Title>
        </LeftHeaderContainer>
        <RightHeaderContainer>
          <FileSelect
            data={selectedDatasetSelectData}
            value={selectedDatasetIndex}
            onChange={(e) => setSelectedDatasetIndex(e.target.value as any)}
            size={'sm'}
          />
          <AddButton onDrop={onAddFiles} />
        </RightHeaderContainer>
      </HeaderContainer>

      <FormatSelect
        data={datasetFormatSelectData}
        value={datasetFormat}
        onChange={(e) => setDatasetFormat(e.target.value as any)}
        size={'md'}
      />

      <Divider />

      <div>todo</div>

      <TimeSelect
        data={timeFormatSelectData}
        value={timeFormat}
        onChange={(e) => setTimeFormat(e.target.value as any)}
        size={'xs'}
      />
      <BarChart data={chartData} />
    </Container>
  );
};

export default ChartWrapper;

type Props = {
  data: BankFileDataType[];
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  margin-top: ${NAVBAR_HEIGHT}px;

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

const FormatSelect = styled(NativeSelect)`
  max-width: 250px;
  min-width: 200px;
`;

const TimeSelect = styled(NativeSelect)`
  max-width: 100px;
  min-width: 75px;
`;

const Divider = styled.div`
  // todo
`;
