import { ParsedCSVDataType } from '../csv/csv.types';
import { getDecimal, unformatMoney } from '../money/money.actions';
import ui from '../ui';
import { BANK_DATA } from './bank.controller';
import {
  BankDataPaths,
  BankDataType,
  BankFileDataType,
  MonthDatasetType,
} from './bank.types';

export const parseCSVData = (
  csvData: ParsedCSVDataType
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

    // Helper method to parse properties
    const parse = <PropertyType extends BankDataPaths<BankDataType>>(
      property: PropertyType,
      parseMethod: (value: any) => { parsedValue: any; valid: boolean }
    ): boolean => {
      let valid = true;

      if (dataKeys.includes(property)) {
        const parseMethodResponse = parseMethod(data[property]);

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

      // Make whole dataset invalid if more than 10 rows are invalid
      if (invalidRows > 10) parsedData.valid = valid;
      if (!valid) invalidRows++;

      return valid;
    };

    // Parse Date
    if (
      !parse('date', (value) => {
        const response = { parsedValue: null as any, valid: false };
        try {
          response.parsedValue = new Date(value);
          response.valid = true;
        } catch (e) {
          console.error(e);
        }
        return response;
      })
    )
      continue;

    // Parse Receiver/Sender
    if (
      !parse('receiver/sender', (value) => {
        return { parsedValue: value.toString(), valid: true };
      })
    )
      continue;

    // Parse Currency
    if (
      !parse('currency', (value) => {
        const validCurrencies = ['EUR'];
        const response = { parsedValue: null as any, valid: false };

        if (validCurrencies.includes(value)) {
          response.parsedValue = value;
          response.valid = true;
        }

        return response;
      })
    )
      continue;

    // Parse Amount
    if (
      !parse('amount', (value) => {
        return {
          parsedValue: unformatMoney(value, getDecimal(newData['currency'])),
          valid: true,
        };
      })
    )
      continue;

    // Parse Debit/Credit
    if (
      !parse('debit/credit', (value) => {
        const response = { parsedValue: null as any, valid: false };
        const parsedValue = value
          .replace('H', 'C') // Replace 'Haben' with 'Credit'
          .replace('S', 'D'); // Replace 'Soll' with 'Debit'

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

  ui.toast('Failed to parse CSV File to valid Bank data!');
  return null;
};

export const getMonthDataset = (
  bankData: BankFileDataType
): MonthDatasetType | null => {
  if (!bankData.valid) return null;
  const data = bankData.data;
  const labels: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'September',
    'October',
    'November',
    'Dezember',
  ];
  const amounts: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (const item of data) {
    const monthIndex = item.date.getMonth();
    if (monthIndex) {
      console.log('Debug: ', {
        item,
        monthIndex,
      });

      if (item['debit/credit'] === 'C') amounts[monthIndex] += item.amount;
      else if (item['debit/credit'] === 'D') amounts[monthIndex] -= item.amount;
    }
  }

  return {
    name: bankData.name,
    labels,
    data: amounts,
    backgroundColors: amounts.map((val) =>
      val > 0 ? 'rgba(54, 162, 235, 0.2)' : 'rgba(255, 99, 132, 0.2)'
    ),
    borderColors: amounts.map((val) =>
      val > 0 ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)'
    ),
  };
};
