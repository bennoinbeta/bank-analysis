import { ParsedCSVDataType } from '../csv/csv.controller';
import ui from '../ui';
import { BankDataType, BankFileDataType, BANK_DATA } from './bank.controller';

export const parseCSVData = (csvData: ParsedCSVDataType) => {
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
    let parsedProperties: string[] = [];

    try {
      // Parse Date
      if (dataKeys.includes('date')) {
        newData['date'] = new Date(data['date']);
        parsedProperties.push('date');
      }

      // Parse Receiver/Sender
      if (dataKeys.includes('receiver/sender')) {
        newData['receiver/sender'] = data['receiver/sender'].toString();
        parsedProperties.push('receiver/sender');
      }

      // Parse Currency
      if (dataKeys.includes('currency')) {
        const validCurrencies = ['EUR'];
        const currency = data['currency'];

        if (validCurrencies.includes(currency)) {
          newData['currency'] = currency;
          parsedProperties.push('currency');
        }
      }

      // Parse Amount
      if (dataKeys.includes('amount')) {
        // TODO
        newData['amount'] = data['amount'];
        parsedProperties.push('amount');
      }

      // Parse Debit/Currency
      if (dataKeys.includes('debit/credit')) {
        const debitOrCredit = data['debit/credit'];

        if (['H', 'S'].includes(debitOrCredit)) {
          newData['debit/credit'] = debitOrCredit;
          parsedProperties.push('debit/credit');
        }
      }

      // If not all properties could be parsed correctly
      if (parsedProperties.length !== 5) {
        console.log('Parsed Properties', parsedProperties);
        parsedData.valid = false;
      }
    } catch (e) {
      parsedData.valid = false;
    }
  }

  // Apply parsed data
  if (parsedData.valid) {
    BANK_DATA.nextStateValue.push(parsedData);
    BANK_DATA.ingest();
  } else {
    ui.toast('Failed to parse CSV File to valid Bank data!');
  }
};
