import { createState } from '@agile-ts/core';

export const CSV_ARRAY = createState([]);

export const onDrop = (acceptedFiles: File[]) => {
  acceptedFiles.forEach((file) => {
    if(!isCSVFile(file.name)){
       return;
    }

    const reader = new FileReader();

    // Setup FileReader callbacks
    reader.onabort = () => console.log('file reading was aborted');
    reader.onerror = () => console.log('file reading has failed');
    reader.onload = (e) => {
      const fileContent = e.target?.result;

      // Transform readed csv file into array
      if (typeof fileContent === 'string') {
        const csvArray = processCSV(fileContent);
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
}

export const processCSV = (fileString: string, separator = ';') => {
  // Extract first line of CSV file
  const headers = fileString
    .slice(0, fileString.indexOf('\n'))
    .split(separator);

  // Extract CSV rows
  const rows = fileString.slice(fileString.indexOf('\n') + 1).split('\n');

  console.log("Headers", {headers, fileString});

  const csvArray = rows.map((row) => {
    const values = row.split(separator);

    console.log("Values", {values, row});

  });

  return csvArray;
};
