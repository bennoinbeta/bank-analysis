import { dateToString, getDatesBetween } from './../utils/utils.actions';
import { ParsedCSVDataType } from '../csv/csv.types';
import { getDecimal, unformatMoney } from '../money/money.actions';
import ui from '../ui';
import { parseGermanDate } from '../utils/utils.actions';
import { BANK_DATA } from './bank.controller';
import {
  BankDataPaths,
  BankDataType,
  BankFileDataType,
  DatasetType,
} from './bank.types';
import { copy } from '@agile-ts/utils';

export const parseCSVData = (
  csvData: ParsedCSVDataType,
  tolleranze = 10
): BankFileDataType | null => {
  const parsedData: BankFileDataType = {
    name: csvData.name,
    parseTimestamp: csvData.parseTimestamp,
    data: [],
    valid: true,
  };

  let invalidRows = 0;

  // Process raw CSV data
  for (let i = 0; i < csvData.data.length && parsedData.valid; i++) {
    const data = csvData.data[i];
    const dataKeys = Object.keys(data);
    const newData: BankDataType = {} as any;

    // Helper method to parse bank properties
    const parse = <PropertyType extends BankDataPaths<BankDataType>>(
      property: PropertyType,
      parseMethod: (value: any) => { parsedValue: any; valid: boolean }
    ): boolean => {
      let valid = true;

      if (dataKeys.includes(property)) {
        const parseMethodResponse = parseMethod(data[property]);

        // Call parse method
        if (parseMethodResponse.valid) {
          newData[property] = parseMethodResponse.parsedValue;
        } else {
          if (invalidRows < 1)
            ui.toast(`Failed to parse property '${property}' at row ${i + 1}!`);
          valid = false;
        }
      } else {
        if (invalidRows < 1)
          ui.toast(
            `Property '${property}' doesn't exist in dataset at row ${i + 1}!`
          );
        valid = false;
      }

      // Make whole dataset invalid if more than in the tolleranze specified rows are invalid
      if (invalidRows > tolleranze) parsedData.valid = valid;
      if (!valid) invalidRows++;

      return valid;
    };

    // Parse 'Date'
    if (
      !parse('date', (value) => {
        const response = { parsedValue: null as any, valid: false };

        try {
          const date = parseGermanDate(value); // TODO support other date formats
          response.parsedValue = date;
          response.valid = date != null;
        } catch (e) {
          console.error(e);
        }

        return response;
      })
    )
      continue;

    // Parse 'Receiver/Sender'
    if (
      !parse('receiver/sender', (value) => {
        return { parsedValue: value.toString(), valid: true };
      })
    )
      continue;

    // Parse 'Currency'
    if (
      !parse('currency', (value) => {
        const validCurrencies = ['EUR', 'USD'];
        const response = { parsedValue: null as any, valid: false };

        // Check wether specified currency is valid
        if (validCurrencies.includes(value)) {
          response.parsedValue = value;
          response.valid = true;
        }

        return response;
      })
    )
      continue;

    // Parse 'Amount'
    if (
      !parse('amount', (value) => {
        return {
          parsedValue: unformatMoney(value, getDecimal(newData['currency'])),
          valid: true,
        };
      })
    )
      continue;

    // Parse 'Debit/Credit'
    if (
      !parse('debit/credit', (value) => {
        const response = { parsedValue: null as any, valid: false };
        const parsedValue = value
          .replace('H', 'C') // Replace 'Haben' with 'Credit'
          .replace('S', 'D'); // Replace 'Soll' with 'Debit'

        // Check wether specified 'debit/credit' indicator is valid
        if (['D', 'C'].includes(parsedValue)) {
          response.parsedValue = parsedValue;
          response.valid = true;
        }

        return response;
      })
    )
      continue;

    // Add valid data to the parsed dataset
    parsedData.data.push(newData);
  }

  // Apply parsed data to global store
  if (parsedData.valid) {
    BANK_DATA.nextStateValue.push(parsedData);
    BANK_DATA.ingest();

    return parsedData;
  }

  ui.toast('Failed to parse CSV File to proceedable Bank data!');
  return null;
};

const isCredit = (item: BankDataType) => {
  return item['debit/credit'] === 'C';
};

const isDebit = (item: BankDataType) => {
  return item['debit/credit'] === 'D';
};

export const getDataset = (
  bankData: BankFileDataType,
  format: 'month' | 'day' | 'year' = 'month'
): { name: string; dataset: DatasetType } | null => {
  if (bankData != null) {
    const dataFormatter = new ChartDataFormatter(bankData);
    return {
      name: bankData.name,
      dataset: dataFormatter.formatDataTimeBased(format),
    };
  }

  return {
    name: 'unknown',
    dataset: {
      labels: [],
      endAmounts: [],
      creditDebitAmounts: [],
      tagAmounts: [],
    },
  };
};

class ChartDataFormatter {
  public data: readonly BankDataType[];

  constructor(bankData: BankFileDataType) {
    const sortedBankData = bankData.data.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    this.data = sortedBankData; // Object.freeze(sortedBankData); Freezing doesn't work properly because of sorting idk
  }

  public formatDataTimeBased(type: 'day' | 'month' | 'year'): DatasetType {
    let dateFormat = 'DD/MM/YYYY';
    if (type === 'month') dateFormat = 'MM/YYYY';
    if (type === 'year') dateFormat = 'YYYY';

    const dataset: DatasetType = {
      labels: [],
      endAmounts: [],
      creditDebitAmounts: [],
      tagAmounts: [],
    };

    // Map data to labels
    for (let i = 0; i < this.data.length; i++) {
      const data = copy(this.data[i]);
      const label = dateToString(data.date, dateFormat);
      const labelIndex = dataset.labels.indexOf(label);
      const exists = labelIndex !== -1;

      // Add date label
      if (!exists) dataset.labels.push(label);

      // Add end amount
      const dateAmount = data.amount * (isDebit(data) ? -1 : 1);
      if (!exists) {
        dataset.endAmounts.push(dateAmount);
      } else {
        dataset.endAmounts[labelIndex] =
          dataset.endAmounts[labelIndex] + dateAmount;
      }

      // Add credit/debit amount
      if (!exists) {
        dataset.creditDebitAmounts.push({
          credit: isCredit(data) ? data.amount : 0,
          debit: isDebit(data) ? data.amount : 0,
        });
      } else {
        const creditDebit = isDebit(data) ? 'debit' : 'credit';
        dataset.creditDebitAmounts[labelIndex][creditDebit] += data.amount;
      }

      // Add tag amount
      // TODO support tags
      if (!exists) {
        dataset.tagAmounts.push({});
      } else {
        // TODO
      }

      // Fill gap between this and the next data date
      if (!exists && i + 1 < this.data.length) {
        getDatesBetween(data.date, this.data[i + 1].date, type).forEach(
          (date) => {
            // Add placeholder label
            dataset.labels.push(dateToString(date, dateFormat));

            // Add placeholder end amount
            dataset.endAmounts.push(0);

            // Add placeholder cred/debit amount
            dataset.creditDebitAmounts.push({
              credit: 0,
              debit: 0,
            });

            // Add placeholder tag amount
            dataset.tagAmounts.push({});
          }
        );
      }
    }

    return dataset;
  }
}
