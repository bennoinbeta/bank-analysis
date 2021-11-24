import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { bank } from '../../../../../core';
import {
  BankFileDataType,
  DatasetFormat,
  TimeFormat,
} from '../../../../../core/entities/bank/bank.types';
import routingHistory from '../../../../../routing/history';
import { useAgileTheme } from '../../../../../styles/theme';
import Icon from '../../../../components/icons';
import NativeSelect from '../../../../components/primitive/inputs/NativeSelect';
import Divider from '../../../../components/primitive/other/Divider';
import Text from '../../../../components/primitive/text/Text';
import Title from '../../../../components/primitive/text/Title';
import { useChartData } from '../../hooks/useChartData';
import Chart, { ChartTypes } from '../Chart';
import AddButton from './components/AddButton';
import TotalDataItem from './components/TotalDataItem';
import { getTotalData, onAddFiles } from './controller';

const ChartWrapper: React.FC<Props> = (props) => {
  const { data } = props;
  const theme = useAgileTheme();

  // Selected NativeSelect State
  const [timeFormat, setTimeFormat] = useState<TimeFormat>('month');
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [datasetFormat, setDatasetFormat] =
    useState<DatasetFormat>('creditDebitAmounts');
  const [chartType, setChartType] = useState<ChartTypes>('line');

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
  const chartTypeSelectData = [
    { label: 'Line', value: 'line' },
    { label: 'Bar', value: 'bar' },
  ];

  // Chart Data
  const selectedFile = data[selectedFileIndex];
  const chartData = useChartData(
    bank.getDataset(selectedFile, timeFormat)?.dataset,
    datasetFormat,
    theme
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
          <ClearButton
            onClick={() => {
              routingHistory.push('/');
              bank.clear();
            }}>
            Clear
          </ClearButton>
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

      <ContentDivider color={theme.colors.layout.rHc2} />

      <ContentHeaderContainer>
        <TotalDataContainer>
          <StyledTotalDataItem
            label={'Credit'}
            value={totalData.totalCredit.toString()}
            color={theme.primitiveColors.blue}
          />
          <StyledTotalDataItem
            label={'Debit'}
            value={totalData.totalDebit.toString()}
            color={theme.primitiveColors.red2}
          />
        </TotalDataContainer>

        <ContentOptionsContainer>
          <ChartSelect
            data={chartTypeSelectData}
            value={chartType}
            onChange={(e) => setChartType(e.target.value as any)}
            size={'xs'}
            leftSection={{
              component: (
                <Icon.BarChart
                  color={theme.colors.layout.rHc}
                  style={{ marginBottom: 2 }}
                />
              ),
            }}
          />
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
        </ContentOptionsContainer>
      </ContentHeaderContainer>

      <Chart data={chartData} type={chartType} />
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

  margin-top: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0 20px 0;
`;

const LeftHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SubTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.layout.p};
`;

const RightHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ClearButton = styled(Text)`
  cursor: pointer;
  margin: 0 10px;

  :hover {
    color: ${({ theme }) => theme.colors.layout.rHc};
  }
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

const ChartSelect = styled(NativeSelect)`
  max-width: 100px;
  min-width: 75px;

  margin-right: 10px;
`;

const ContentDivider = styled(Divider)`
  margin: 20px 0;
`;

const ContentHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const ContentOptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TotalDataContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledTotalDataItem = styled(TotalDataItem)`
  margin-right: 15px;
`;
