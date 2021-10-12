import ui from '../ui';
import { PARSED_CSV_FILES } from './csv.controller';

const getFileExtension = (filename: string): string | null => {
  const parts = filename.split('.');
  return parts.length > 0 ? parts[parts.length - 1] : null;
};

const isCSVFile = (filename: string): boolean => {
  return getFileExtension(filename) === 'csv';
};

const parseCSV = (fileString: string, separator = ';') => {
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
      rowObject[headers[i]] = value.replace('\r', '');
    });

    return rowObject;
  });

  return csvArray;
};

export const parseFile = (file: File) => {
  const reader = new FileReader();

  if (!isCSVFile(file.name)) {
    ui.toast('Invalid CSV file provided!');
    return;
  }

  // Setup FileReader callbacks
  reader.onabort = () => ui.toast('File reading was aborted!');
  reader.onerror = () => ui.toast('File reading has failed!');
  reader.onload = (e) => {
    // Parse File Content
    if (parseFileContent(e.target?.result, file))
      ui.toast(`Proceeded '${ui.truncate(file.name)}'!`, 'success');
  };

  // Start reading specified file
  reader.readAsText(file);
};

const parseFileContent = (fileContentAsText: any, file: File) => {
  // Transform readed csv file into procidable array
  if (typeof fileContentAsText === 'string') {
    const csvArray = parseCSV(fileContentAsText);

    PARSED_CSV_FILES.nextStateValue.push({
      name: file.name,
      data: csvArray,
      parseTimestamp: Date.now(),
    });
    PARSED_CSV_FILES.ingest();

    return true;
  }
  return false;
};

export const getDateChartData = () => {};
