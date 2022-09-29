import { ParsedCSVDataType } from '../../csv/csv.types';

export const banksFormatter: BankFormatterType = {
  vrbank_v2: {
    onFormatRawData: (csvData: ParsedCSVDataType) => {
      const newCsvData: ParsedCSVDataType = {
        name: csvData.name,
        parseTimestamp: csvData.parseTimestamp,
        data: [],
      };

      for (let i = 0; i < csvData.data.length; i++) {
        const data = csvData.data[i];
        const formattedDataRow: any = {};

        formattedDataRow['date'] = data['Buchungstag'];
        formattedDataRow['currency'] = data['Waehrung'];
        formattedDataRow['amount'] = data['Betrag']?.replace('-', '');
        const isNegative = data['Betrag']?.startsWith('-');
        formattedDataRow['debit/credit'] = isNegative ? 'D' : 'C';
        formattedDataRow['receiver/sender'] = data['Name Zahlungsbeteiligter'];
        formattedDataRow['description'] = data['Verwendungszweck'];

        newCsvData.data[i] = formattedDataRow;
      }

      console.log('Formatted VrBank_v2 data to processable data', {
        csvData,
        newCsvData,
      });
      return newCsvData;
    },
    onFormatRows: (rows) => {
      const newRows = [...rows];

      // Remove last row
      newRows.splice(newRows.length - 1, newRows.length);

      console.log('Formatted VrBank_v2 rows to processable rows', {
        rows,
        newRows,
      });
      return newRows;
    },
  },
  vrbank_v1: {
    onFormatRawData: (csvData: ParsedCSVDataType) => {
      const newCsvData: ParsedCSVDataType = {
        name: csvData.name,
        parseTimestamp: csvData.parseTimestamp,
        data: [],
      };

      for (let i = 0; i < csvData.data.length; i++) {
        const data = csvData.data[i];
        const formattedDataRow: any = {};

        formattedDataRow['date'] = data['Buchungstag'];
        formattedDataRow['currency'] = data['W�hrung'];
        formattedDataRow['amount'] = data['Umsatz'];
        formattedDataRow['debit/credit'] = data['Soll/Haben']
          .replace('H', 'C') // Replace 'Haben' with 'Credit'
          .replace('S', 'D'); // Replace 'Soll' with 'Debit'
        formattedDataRow['receiver/sender'] = data['Zahlungsempf�nger'];
        formattedDataRow['description'] = data['Vorgang/Verwendungszweck'];

        newCsvData.data[i] = formattedDataRow;
      }

      console.log('Formatted VrBank_v1 data to processable data', {
        csvData,
        newCsvData,
      });
      return newCsvData;
    },
    onFormatRows: (rows) => {
      let newRows = [...rows];

      // Remove first 14 rows and last 4 rows
      newRows.splice(0, 15);
      newRows.splice(newRows.length - 4, newRows.length);

      console.log('Formatted VrBank_v2 rows to processable rows', {
        rows,
        newRows,
      });
      return newRows;
    },
  },
};

type BankFormatterType = Record<
  string,
  {
    onFormatRawData: (csvData: ParsedCSVDataType) => ParsedCSVDataType;
    onFormatRows: (rows: string[]) => string[];
  }
>;
