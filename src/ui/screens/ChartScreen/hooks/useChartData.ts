import { getChartDataFormatter } from '../../../../core/entities/bank/bank.actions';
import {
  BankFileDataType,
  DatasetFormat,
  TimeFormat,
} from '../../../../core/entities/bank/bank.types';
import { AgileTheme } from '../../../../styles/theme';
import { hexToRgba } from '../../../../styles/theme/utils/hexToRgba';

export const useChartData = (
  selectedFile: BankFileDataType,
  timeFormat: TimeFormat,
  type: DatasetFormat = DatasetFormat.END_AMOUNTS,
  theme: AgileTheme
): any => {
  const dataFormatter = getChartDataFormatter();

  if (
    type === DatasetFormat.END_AMOUNTS ||
    type === DatasetFormat.CREDIT_DEBIT_AMOUNTS
  ) {
    const chartDataset = dataFormatter.formatDataTimeBased(
      selectedFile.dataset,
      timeFormat
    );
    if (chartDataset != null) {
      if (type === DatasetFormat.END_AMOUNTS) {
        const backgroundColors = chartDataset.endAmounts.map((val: any) =>
          val > 0
            ? hexToRgba(theme.primitiveColors.blue, 0.2)
            : hexToRgba(theme.primitiveColors.red2, 0.2)
        );
        const borderColors = chartDataset.endAmounts.map((val: any) =>
          val > 0 ? theme.primitiveColors.blue : theme.primitiveColors.red2
        );

        return {
          labels: chartDataset.labels,
          datasets: [
            {
              label: 'Money',
              data: chartDataset.endAmounts,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              segment: {
                borderColor: (ctx: any) =>
                  up(ctx, 'rgba(54, 162, 235, 1)') ||
                  down(ctx, 'rgba(255, 99, 132, 1)'),
              },
              borderWidth: 1,
            },
          ],
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        };
      }

      if (type === DatasetFormat.CREDIT_DEBIT_AMOUNTS) {
        const creditDataset = chartDataset.creditDebitAmounts.map(
          (val) => val.credit
        );
        const debitDataset = chartDataset.creditDebitAmounts.map(
          (val) => val.debit
        );

        return {
          labels: chartDataset.labels,
          datasets: [
            {
              label: 'Credit',
              data: creditDataset,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
            {
              label: 'Debit',
              data: debitDataset,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        };
      }
    }
  }

  if (type === DatasetFormat.CATEGORY) {
    const chartDataset = dataFormatter.formatDataTimeBased(
      selectedFile.dataset,
      timeFormat
    );
    if (chartDataset != null) {
      // TODO
    }
  }

  return null;
};

const up = (ctx: any, value: any) => {
  return ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined;
};

const down = (ctx: any, value: any) => {
  return ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;
};
