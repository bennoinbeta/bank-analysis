import { copy } from '@agile-ts/utils';

import { dateToString, getDatesBetween } from '../../utils/utils.actions';
import {
  BankDataType,
  Tag,
  TagBasedDatasetType,
  TimeBasedDatasetType,
  TimeFormat,
} from '../bank.types';

export class ChartDataFormatter {
  public formatDataTimeBased(
    dataset: BankDataType[],
    type: TimeFormat
  ): TimeBasedDatasetType {
    let dateFormat = 'DD/MM/YYYY';
    if (type === TimeFormat.MONTH) dateFormat = 'MM/YYYY';
    if (type === TimeFormat.YEAR) dateFormat = 'YYYY';

    const sortedDataset = dataset.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );

    const chartDataset: TimeBasedDatasetType = {
      labels: [],
      endAmounts: [],
      creditDebitAmounts: [],
    };

    // Map data to labels
    for (let i = 0; i < sortedDataset.length; i++) {
      const data = copy(sortedDataset[i]);
      const label = dateToString(data.date, dateFormat);
      const labelIndex = chartDataset.labels.indexOf(label);
      const exists = labelIndex !== -1;

      // Add date label
      if (!exists) chartDataset.labels.push(label);

      // Add end amount
      const dateAmount = data.amount * (this.isDebit(data) ? -1 : 1);
      if (!exists) {
        chartDataset.endAmounts.push(dateAmount);
      } else {
        chartDataset.endAmounts[labelIndex] =
          chartDataset.endAmounts[labelIndex] + dateAmount;
      }

      // Add credit/debit amount
      if (!exists) {
        chartDataset.creditDebitAmounts.push({
          credit: this.isCredit(data) ? data.amount : 0,
          debit: this.isDebit(data) ? data.amount : 0,
        });
      } else {
        const creditDebit = this.isDebit(data) ? 'debit' : 'credit';
        chartDataset.creditDebitAmounts[labelIndex][creditDebit] += data.amount;
      }

      // Fill gap between this and the next data date
      if (!exists && i + 1 < dataset.length) {
        getDatesBetween(data.date, dataset[i + 1].date, type).forEach(
          (date) => {
            // Add placeholder label
            chartDataset.labels.push(dateToString(date, dateFormat));

            // Add placeholder end amount
            chartDataset.endAmounts.push(0);

            // Add placeholder cred/debit amount
            chartDataset.creditDebitAmounts.push({
              credit: 0,
              debit: 0,
            });
          }
        );
      }
    }

    console.log({ chartDataset });

    return chartDataset;
  }

  public formatDataTagBased(dataset: BankDataType[]): TagBasedDatasetType {
    const chartDataset: TagBasedDatasetType = {
      labels: [],
      tagAmounts: [],
    };

    // Map data to labels
    for (let i = 0; i < dataset.length; i++) {
      const data = copy(dataset[i]);
      if (data.tags != null) {
        for (const tag of data.tags) {
          const label = tag;
          const labelIndex = chartDataset.labels.indexOf(label);
          const exists = labelIndex !== -1;

          // Add date label
          if (!exists) chartDataset.labels.push(label);

          // Add credit/debit amount
          if (!exists) {
            chartDataset.tagAmounts.push({
              credit: this.isCredit(data) ? data.amount : 0,
              debit: this.isDebit(data) ? data.amount : 0,
            });
          } else {
            const creditDebit = this.isDebit(data) ? 'debit' : 'credit';
            chartDataset.tagAmounts[labelIndex][creditDebit] += data.amount;
          }
        }
      }
    }

    console.log({ chartDataset });

    return chartDataset;
  }

  private isCredit(item: BankDataType) {
    return item['debit/credit'] === 'C';
  }

  private isDebit(item: BankDataType) {
    return item['debit/credit'] === 'D';
  }
}
