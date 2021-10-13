import { resolve } from 'dns';
import ui from '../ui';
import { ParsedCSVDataType, PARSED_CSV_FILES } from './csv.controller';

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
      return;
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

const parseCSVFileContent = (
  fileContentAsText: any,
  file: File
): ParsedCSVDataType | null => {
  // Transform readed csv file into procidable array
  if (typeof fileContentAsText === 'string') {
    const csvData = {
      name: file.name,
      data: processCSVFileContent(fileContentAsText),
      parseTimestamp: Date.now(),
    };

    // Save parsed CSV Data in global store
    PARSED_CSV_FILES.nextStateValue.push(csvData);
    PARSED_CSV_FILES.ingest();

    return csvData;
  }

  return null;
};

const processCSVFileContent = (fileContentAsText: string, separator = ';') => {
  // Extract first line of CSV file
  const headers = fileContentAsText
    .slice(0, fileContentAsText.indexOf('\n'))
    .split(separator)
    .map((v) => v.replace('\r', ''));

  // Extract CSV rows
  const rows = fileContentAsText
    .slice(fileContentAsText.indexOf('\n') + 1)
    .split('\n');

  const csvArray = rows.map((row) => {
    const rowObject: { [key: string]: string } = {};
    const values = row.split(separator);

    // Map row values into an object with the extracted header keys
    values.map((value, i) => {
      rowObject[headers[i]] = value.replace('\r', '');
    });

    return rowObject;
  });

  return csvArray;
};

export const getDateChartData = () => {};
