import { ui, csv } from '../../../core';
import bank from '../../../core/entities/bank';

export const onDrop = async (acceptedFiles: File[]) => {
  ui.setIsLoading(true);

  await ui.sleep(3000); // TODO REMOVE

  acceptedFiles.forEach(async (file) => {
    // Parse CSV File to Javascript object array
    const csvData = await csv.parseCSVFile(file);

    if (csvData != null) {
      ui.toast(`Proceeded '${ui.truncate(file.name)}'!`, 'success');

      // Parse Javascript object array to valid bank data
      bank.parseCSVData(csvData);
    }
  });

  ui.setIsLoading(false);
};
