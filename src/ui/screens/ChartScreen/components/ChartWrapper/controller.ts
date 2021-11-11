import { ui, csv } from '../../../../../core';
import bank from '../../../../../core/entities/bank';

export const onAddFiles = async (acceptedFiles: File[]) => {
  ui.setIsLoading(true);

  for (const file of acceptedFiles) {
    // Parse CSV File to Javascript object array
    const csvData = await csv.parseCSVFile(file);

    if (csvData != null) {
      // Parse Javascript object array to valid bank data
      if (bank.parseCSVData(csvData) != null) {
        ui.toast(`Proceeded '${ui.truncate(file.name)}'!`, 'success');
      }
    }
  }

  ui.setIsLoading(false);
};
