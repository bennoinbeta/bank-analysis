import { csv, ui } from '../../../core';
import bank from '../../../core/entities/bank';
import routingHistory from '../../../routing/history';

export const onDrop = async (acceptedFiles: File[]) => {
  ui.setIsLoading(true);

  await ui.sleep(3000); // TODO REMOVE

  let successfullyProcessedFile = false;
  for (const file of acceptedFiles) {
    // Parse CSV File to Javascript object array
    const csvData = await csv.parseCSVFile(file);

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
