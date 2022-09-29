import { banksFormatter } from '../bank/services/banksFormatter';
import ui from '../ui';
import { PARSED_CSV_FILES } from './csv.controller';
import { ParsedCSVDataType } from './csv.types';

const getFileExtension = (filename: string): string | null => {
  const parts = filename.split('.');
  return parts.length > 0 ? parts[parts.length - 1] : null;
};

const isCSVFile = (filename: string): boolean => {
  return getFileExtension(filename) === 'csv';
};

export const parseCSVFile = (file: File): Promise<ParsedCSVDataType | null> => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    if (!isCSVFile(file.name)) {
      ui.toast('Invalid CSV file provided!');
      resolve(null);
    }

    // Setup FileReader callbacks
    reader.onabort = () => ui.toast('File reading was aborted!');
    reader.onerror = () => ui.toast('File reading has failed!');
    reader.onload = (e) => {
      resolve(parseCSVFileContent(e.target?.result, file));
    };

    // Start reading specified file
    reader.readAsText(file);
  });
};

export const parseCSVFileContent = (
  fileContentAsText: any,
  file: File | string
): ParsedCSVDataType | null => {
  // Transform read csv file into processable array
  if (typeof fileContentAsText === 'string') {
    const fileName = typeof file === 'string' ? file : file.name;
    const csvData = {
      name: fileName,
      data: processCSVFileContent(fileContentAsText, fileName),
      parseTimestamp: Date.now(),
    };

    // Save parsed CSV Data in global store
    PARSED_CSV_FILES.nextStateValue.push(csvData);
    PARSED_CSV_FILES.ingest();

    return csvData;
  }

  return null;
};

const processCSVFileContent = (
  fileContentAsText: string,
  fileName: string,
  separator = ';'
) => {
  // Extract CSV rows
  const rows = fileContentAsText.split('\n');

  // Format Rows
  const keys = Object.keys(banksFormatter);
  let formatType: string | null = null;
  for (const key of keys) {
    if (fileName.toLowerCase().startsWith(key)) {
      formatType = key;
    }
  }
  const formattedRows =
    formatType != null ? banksFormatter[formatType].onFormatRows(rows) : rows;

  // Extract first line of CSV file and parse it to header
  let headers: string[] = [];
  if (formattedRows.length > 0) {
    headers = formattedRows[0].split(separator).map((v) => v.replace('\r', ''));
    formattedRows.shift(); // remove header (first row) from formattedRows, which are transformed to the data
  }

  const csvArray = formattedRows.map((row) => {
    const rowObject: Record<string, string> = {};
    const values = row.split(separator);

    // Map row values into an object with the extracted header keys
    values.map((value, i) => {
      rowObject[headers[i]] = value.replace('\r', '');
    });

    return rowObject;
  });

  console.log('Parsed CSV-Array', { csvArray });

  return csvArray;
};
