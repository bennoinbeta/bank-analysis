import { createState, globalBind } from '@agile-ts/core';
import { createEvent } from '@agile-ts/event';

type ToastEventPayload = {
  type: 'error' | 'success' | 'warn';
  message: string;
};

export const CSV_ARRAY = createState<{ [key: string]: any }[]>([]);
export const TOAST_EVENT = createEvent<ToastEventPayload>();

export const onDrop = (acceptedFiles: File[]) => {
  acceptedFiles.forEach((file) => {
    if (!isCSVFile(file.name)) {
      TOAST_EVENT.trigger({
        type: 'error',
        message: 'Invalid CSV file provided!',
      });
      return;
    }

    const reader = new FileReader();

    // Setup FileReader callbacks
    reader.onabort = () =>
      TOAST_EVENT.trigger({
        type: 'error',
        message: 'File reading was aborted!',
      });
    reader.onerror = () =>
      TOAST_EVENT.trigger({
        type: 'error',
        message: 'File reading has failed!',
      });
    reader.onload = (e) => {
      const fileContent = e.target?.result;

      // Transform readed csv file into procidable array
      if (typeof fileContent === 'string') {
        const csvArray = processCSV(fileContent);

        CSV_ARRAY.set((value) => value.concat(csvArray));

        TOAST_EVENT.trigger({
          type: 'success',
          message: `Proceeded '${truncate(file.name)}'!`,
        });
      }
    };

    // Staart reading specified file
    reader.readAsText(file);
  });
};

const getFileExtension = (filename: string): string | null => {
  const parts = filename.split('.');
  return parts.length > 0 ? parts[parts.length - 1] : null;
};

const isCSVFile = (filename: string): boolean => {
  return getFileExtension(filename) === 'csv';
};

// https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings
const truncate = (str: string, max = 10): string => {
  return str.length > max ? str.substr(0, max - 1) + '..' : str;
};

export const processCSV = (fileString: string, separator = ';') => {
  // Extract first line of CSV file
  const headers = fileString
    .slice(0, fileString.indexOf('\n'))
    .split(separator);

  // Extract CSV rows
  const rows = fileString.slice(fileString.indexOf('\n') + 1).split('\n');

  const csvArray = rows.map((row) => {
    const rowObject: { [key: string]: string } = {};
    const values = row.split(separator);

    // Map row values into an object with the extracted header keys
    values.map((value, i) => {
      rowObject[headers[i]] = value;
    });

    return rowObject;
  });

  return csvArray;
};

// For better debugging
if (process.env.NODE_ENV !== 'production')
  globalBind('__core__', { CSV_ARRAY, TOAST_EVENT });
