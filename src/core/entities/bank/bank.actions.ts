import { ParsedCSVDataType } from '../csv/csv.types';
import { getDecimal, unformatMoney } from '../money/money.actions';
import ui from '../ui';
import { parseGermanDate } from '../utils/utils.actions';
import { BANK_DATA } from './bank.controller';
import {
  BankDataPaths,
  BankDataType,
  BankFileDataType,
  MonthDatasetType,
} from './bank.types';

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

export const getMonthDataset = (
  bankData: BankFileDataType
): MonthDatasetType | null => {
  if (!bankData.valid) return null;
  const data = bankData.data;
  const labelsKeymap: { [key: string]: string } = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'Dezember',
  };
  const dataset: any = {};

  for (const item of data) {
    const month = item.date.getMonth();
    const year = item.date.getFullYear();
    if (!isNaN(month) && !isNaN(year)) {
      // Create new Year template to miss on month
      if (!dataset.hasOwnProperty(year)) {
        dataset[year] = {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
          10: 0,
          11: 0,
        };
      }

      // Calculate amount based on the debit and credit
      if (isCredit(item)) dataset[year][month] += item.amount;
      else if (isDebit(item)) dataset[year][month] -= item.amount;
    }
  }

  const finalDataset: { [key: string]: { labels: string[]; data: number[] } } =
    {};

  // Map data to displayable data based on years
  for (const key of Object.keys(dataset)) {
    if (!finalDataset.hasOwnProperty(key)) {
      finalDataset[key] = { labels: [], data: [] };
    }

    finalDataset[key]['labels'] = Object.keys(dataset[key]).map(
      (m) => labelsKeymap[m]
    );
    finalDataset[key]['data'] = Object.keys(dataset[key]).map(
      (m) => dataset[key][m]
    );
  }

  return {
    name: bankData.name,
    dataset: finalDataset,
  };
};
