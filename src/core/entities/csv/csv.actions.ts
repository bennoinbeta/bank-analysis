export const getFileExtension = (filename: string): string | null => {
  const parts = filename.split('.');
  return parts.length > 0 ? parts[parts.length - 1] : null;
};

export const isCSVFile = (filename: string): boolean => {
  return getFileExtension(filename) === 'csv';
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
