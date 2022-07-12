import { csv, ui } from '../../../core';
import bank from '../../../core/entities/bank';
import { parseCSVFileContent } from '../../../core/entities/csv/csv.actions';
import { ParsedCSVDataType } from '../../../core/entities/csv/csv.types';
import routingHistory from '../../../routing/history';

export const onDrop = async (
  acceptedFiles: (File | { data: string; name: string })[]
) => {
  ui.setIsLoading(true);

  await ui.sleep(3000); // TODO REMOVE

  let successfullyProcessedFile = false;
  for (const file of acceptedFiles) {
    let csvData: ParsedCSVDataType | null;

    // Parse CSV File to Javascript object array
    if (file instanceof File) {
      csvData = await csv.parseCSVFile(file);
    } else {
      csvData = parseCSVFileContent(file.data, file.name);
    }

    if (csvData != null) {
      // Parse Javascript object array to valid bank data
      if (bank.parseCSVData(csvData) != null) {
        ui.toast(`Proceeded '${ui.truncate(file.name)}'!`, 'success');
        successfullyProcessedFile = true;
      }
    }
  }

  // Go to chart screen
  if (successfullyProcessedFile) routingHistory.push('/chart');

  ui.setIsLoading(false);
};

export const onExample = async () => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/bennodev19/bank-analysis/master/static/example-csv-data.csv'
    );
    const csvData = await response.text();
    await onDrop([{ data: csvData, name: 'example-csv-data' }]);
  } catch (e) {
    console.error(e);
    ui.toast('An error occurred while fetching the example data.');
  }
};
