import { MonthDatasetType } from '../../../../core/entities/bank/bank.types';

export const useMonthGrapData = (
  monthDataset: MonthDatasetType | null,
  year = new Date().getFullYear()
): any => {
  if (monthDataset != null) {
    const data = monthDataset?.dataset[year].data;
    const labels = monthDataset.dataset[year].labels;
    const backgroundColors = data.map((val) =>
      val > 0 ? 'rgba(54, 162, 235, 0.2)' : 'rgba(255, 99, 132, 0.2)'
    );
    const borderColors = data.map((val) =>
      val > 0 ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)'
    );

    return {
      labels,
      datasets: [
        {
          label: 'Money',
          data,
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

  return {};
};
