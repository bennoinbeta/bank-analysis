import { copy } from '@agile-ts/utils';

import { PARSED_CSV_FILES } from '../csv/csv.controller';
import { ParsedCSVDataType } from '../csv/csv.types';
import { getDecimal, unformatMoney } from '../money/money.actions';
import ui from '../ui';
import { parseGermanDate } from '../utils/utils.actions';
import { BANK_DATA, IS_PERSISTED } from './bank.controller';
import {
  BankDataPaths,
  BankDataType,
  BankFileDataType,
  Tag,
  tagIdentifiers,
} from './bank.types';
import { ChartDataFormatter } from './services/ChartDataFormatter';
import { banksFormatter } from './services/banksFormatter';

export const parseCSVData = (
  csvData: ParsedCSVDataType,
  tolerance = 10
): BankFileDataType | null => {
  const parsedBankFileDataset: BankFileDataType = {
    name: csvData.name,
    parseTimestamp: csvData.parseTimestamp,
    dataset: [], // date, currency, amount, debit/credit, receiver/sender
    valid: true,
  };

  // Format CSVData
  const keys = Object.keys(banksFormatter);
  let formatType: string | null = null;
  for (const key of keys) {
    if (csvData.name.toLowerCase().startsWith(key)) {
      formatType = key;
    }
  }
  const formattedCSVData =
    formatType != null
      ? banksFormatter[formatType].onFormatRawData(csvData)
      : csvData;

  let invalidRows = 0;

  // Process raw CSV data
  for (
    let i = 0;
    i < formattedCSVData.data.length && parsedBankFileDataset.valid;
    i++
  ) {
    const data = formattedCSVData.data[i];
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

      // Make whole dataset invalid if more than in the tolerance specified rows are invalid
      if (invalidRows > tolerance) parsedBankFileDataset.valid = valid;
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

    // Parse 'Description'
    if (
      !parse('description', (value) => {
        return { parsedValue: value.toString(), valid: true };
      })
    )
      continue;

    // Parse 'Currency'
    if (
      !parse('currency', (value) => {
        const validCurrencies = ['EUR', 'USD'];
        const response = { parsedValue: null as any, valid: false };

        // Check whether specified currency is valid
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

        // Check whether specified 'debit/credit' indicator is valid
        if (['D', 'C'].includes(value)) {
          response.parsedValue = value;
          response.valid = true;
        }

        return response;
      })
    )
      continue;

    // Apply Tags
    let tags: Tag[] = [];
    for (const identifier of tagIdentifiers) {
      for (const i of identifier.identifiers) {
        if (
          (newData['receiver/sender'] != null &&
            newData['receiver/sender']
              ?.toLowerCase()
              .includes(i.toLowerCase())) ||
          (newData['description'] != null &&
            newData['description']?.toLowerCase().includes(i.toLowerCase()))
        ) {
          // Check whether same tag was already identified in an earlier identifier
          for (const tag of identifier.tags) {
            if (!tags.includes(tag)) {
              tags.push(tag);
            }
          }
        }
      }
    }
    newData.tags = tags;

    if (newData.tags.length === 0) {
      newData.tags.push(Tag.UNCATEGORIZED);
    }

    // Add valid data to the parsed dataset
    parsedBankFileDataset.dataset.push(newData);
  }

  // Apply parsed data to global store
  if (parsedBankFileDataset.valid) {
    console.log('Final Bank Data', {
      parsedBankFileData: parsedBankFileDataset,
    });

    BANK_DATA.nextStateValue.push(parsedBankFileDataset);

    // Combine datasets to one shared set if more than one dataset was added
    if (BANK_DATA.nextStateValue.length > 1) {
      // Extend Combined Data field with new data field
      if (BANK_DATA.nextStateValue[0].name === 'Combined') {
        BANK_DATA.nextStateValue[0].dataset =
          BANK_DATA.nextStateValue[0].dataset.concat(
            parsedBankFileDataset.dataset
          );
      }
      // Add Combined Data field
      else {
        let combinedData: BankDataType[] = [];
        for (const item of BANK_DATA.nextStateValue) {
          combinedData = combinedData.concat(item.dataset);
        }
        BANK_DATA.nextStateValue.unshift({
          name: 'Combined',
          parseTimestamp: Date.now(),
          valid: true,
          dataset: combinedData,
        });
      }
    }

    BANK_DATA.ingest();

    return parsedBankFileDataset;
  }

  ui.toast('Failed to parse CSV File to processable Bank data!');
  return null;
};

export const { getChartDataFormatter } = (() => {
  let chartFormatter: ChartDataFormatter | null = null;
  const getChartDataFormatter = (): ChartDataFormatter => {
    if (chartFormatter == null) {
      chartFormatter = new ChartDataFormatter();
    }
    return chartFormatter;
  };

  return { getChartDataFormatter };
})();

export async function persistBankDataset() {
  if (BANK_DATA.persistent != null) {
    await BANK_DATA.persistent.persistValue();
  } else {
    BANK_DATA.persist({
      key: 'bank-data',
      onSave: (value: BankFileDataType[]) => {
        return copy(value).map((bankFileData) => {
          const newBankFileData = bankFileData;
          newBankFileData.dataset = newBankFileData.dataset.map((data) => {
            data.date = data.date.getTime() as any;
            return data;
          });
          return newBankFileData;
        });
      },
      onMigrate: (value) => {
        return value.map((bankFileData: any) => {
          const newBankFileData = bankFileData as BankFileDataType;
          newBankFileData.dataset = newBankFileData.dataset.map((data) => {
            data.date = new Date(data.date);
            return data;
          });
          return newBankFileData;
        });
      },
    });
  }
}

export async function unpersistBankData() {
  if (BANK_DATA.persistent != null) {
    await BANK_DATA.persistent.removePersistedValue();
  }
}

export function clear() {
  BANK_DATA.set([]);
  PARSED_CSV_FILES.set([]);
  IS_PERSISTED.set(false);
}
