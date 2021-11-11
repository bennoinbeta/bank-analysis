import { NullType } from '../../../../types/Utils';
import {
  DatasetFormat,
  DatasetType,
} from '../../../../core/entities/bank/bank.types';

export const useChartData = (
  dataset: DatasetType | NullType,
  type: DatasetFormat = 'endAmounts'
): any => {
  if (dataset != null) {
    if (type === 'endAmounts') {
      const backgroundColors = dataset.endAmounts.map((val: any) =>
        val > 0 ? 'rgba(54, 162, 235, 0.2)' : 'rgba(255, 99, 132, 0.2)'
      );
      const borderColors = dataset.endAmounts.map((val: any) =>
        val > 0 ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)'
      );

      return {
        labels: dataset.labels,
        datasets: [
          {
            label: 'Money',
            data: dataset.endAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
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

    if (type === 'creditDebitAmounts') {
      const creditDataset = dataset.creditDebitAmounts.map((val) => val.credit);
      const debitDataset = dataset.creditDebitAmounts.map((val) => val.debit);

      return {
        labels: dataset.labels,
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

  return null;
};
