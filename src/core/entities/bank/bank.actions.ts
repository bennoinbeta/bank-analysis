import { ParsedCSVDataType } from '../csv/csv.controller';
import ui from '../ui';
import { BankDataType, BankFileDataType, BANK_DATA } from './bank.controller';

export const parseCSVData = (
  csvData: ParsedCSVDataType
): BankFileDataType | null => {
  const parsedData: BankFileDataType = {
    name: csvData.name,
    parseTimestamp: csvData.parseTimestamp,
    data: [],
    valid: true,
  };

  // Process raw CSV data
  for (let i = 0; i < csvData.data.length && parsedData.valid; i++) {
    const data = csvData.data[i];
    const dataKeys = Object.keys(data);
    const newData: BankDataType = {} as any;

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
          ui.toast(`Failed to parse property '${property}' at row ${i}!`);
          valid = false;
        }
      } else {
        ui.toast(
          `Property '${property}' doesn't exist in dataset at row ${i}!`
        );
        valid = false;
      }

      // parsedData.valid = valid;
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
        // TODO
        return { parsedValue: value, valid: true };
      })
    )
      continue;

    // Parse Debit/Credit
    if (
      !parse('debit/credit', (value) => {
        const response = { parsedValue: null as any, valid: false };

        if (['H', 'S'].includes(value)) {
          response.parsedValue = value;
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

type BankDataPaths<T> = {
  [K in keyof T]: T[K] extends any ? K : never;
}[keyof T] &
  string;
