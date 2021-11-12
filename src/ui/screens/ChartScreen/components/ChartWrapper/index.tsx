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
import { getTotalData, onAddFiles } from './controller';
import Icon from '../../../../components/icons';
import { useAgileTheme } from '../../../../../styles/theme';
import Divider from '../../../../components/primitive/Divider';
import TotalDataItem from './components/TotalDataItem';

const ChartWrapper: React.FC<Props> = (props) => {
  const { data } = props;
  const theme = useAgileTheme();

  // Selected NativeSelect State
  const [timeFormat, setTimeFormat] = useState<TimeFormat>('month');
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [datasetFormat, setDatasetFormat] =
    useState<DatasetFormat>('creditDebitAmounts');

  // NativeSelect Datasets
  const selectedFileSelectData = data
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

  // Chart Data
  const selectedFile = data[selectedFileIndex];
  const chartData = useChartData(
    bank.getDataset(selectedFile, timeFormat)?.dataset,
    datasetFormat
  );

  const totalData = getTotalData(selectedFile, 0);

  // When adding new data, select the latest added data
  useEffect(() => {
    setSelectedFileIndex(data.length - 1);
  }, [data.length]);

  return (
    <Container>
      <HeaderContainer>
        <LeftHeaderContainer>
          <SubTitle size={'lg'}>
            {selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.'))}
          </SubTitle>
          <Title>Dashboard</Title>
        </LeftHeaderContainer>
        <RightHeaderContainer>
          <FileSelect
            data={selectedFileSelectData}
            value={selectedFileIndex}
            onChange={(e) => setSelectedFileIndex(e.target.value as any)}
            size={'sm'}
            leftSection={{
              component: (
                <Icon.FileText
                  color={theme.colors.layout.rHc}
                  style={{ marginBottom: 2 }}
                />
              ),
            }}
          />
          <AddButton onDrop={onAddFiles} />
        </RightHeaderContainer>
      </HeaderContainer>

      <FormatSelect
        data={datasetFormatSelectData}
        value={datasetFormat}
        onChange={(e) => setDatasetFormat(e.target.value as any)}
        size={'md'}
        leftSection={{
          component: (
            <Icon.DollarSign
              width={20}
              height={20}
              color={theme.colors.layout.rHc}
              style={{ marginBottom: 2 }}
            />
          ),
        }}
      />

      <ContentDivider color={theme.colors.layout.p} />

      <ContentHeaderContainer>
        <TotalDataContainer>
          <StyledTotalDataItem
            label={'Credit'}
            value={totalData.totalCredit.toString()}
            color={'rgba(54, 162, 235, 1)'}
          />
          <StyledTotalDataItem
            label={'Debit'}
            value={totalData.totalDebit.toString()}
            color={'rgba(255, 99, 132, 1)'}
          />
        </TotalDataContainer>

        <TimeSelect
          data={timeFormatSelectData}
          value={timeFormat}
          onChange={(e) => setTimeFormat(e.target.value as any)}
          size={'xs'}
          leftSection={{
            component: (
              <Icon.Calendar
                color={theme.colors.layout.rHc}
                style={{ marginBottom: 2 }}
              />
            ),
          }}
        />
      </ContentHeaderContainer>

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

const ContentDivider = styled(Divider)`
  margin: 20px 0;
`;

const ContentHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  background-color: green;
`;

const TotalDataContainer = styled.div`
  display: flex;
  flex-direction: row;

  background-color: chocolate;
`;

const StyledTotalDataItem = styled(TotalDataItem)`
  margin-right: 15px;
`;
