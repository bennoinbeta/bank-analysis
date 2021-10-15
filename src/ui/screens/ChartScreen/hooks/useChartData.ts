import { NullType } from '../../../../core/entities/utils/utils.types';
import { DatasetType } from './../../../../core/entities/bank/bank.types';

export const useChartData = (dataset: DatasetType | NullType): any => {
  if (dataset != null) {
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

  return null;
};
