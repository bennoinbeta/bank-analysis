import { ui, csv } from '../../../core';

export const onDrop = (acceptedFiles: File[]) => {
  acceptedFiles.forEach((file) => {
    if (!csv.isCSVFile(file.name)) {
      ui.toast('Invalid CSV file provided!');
      return;
    }

    const reader = new FileReader();

    // Setup FileReader callbacks
    reader.onabort = () => ui.toast('File reading was aborted!');
    reader.onerror = () => ui.toast('File reading has failed!');
    reader.onload = (e) => {
      const fileContent = e.target?.result;

      // Transform readed csv file into procidable array
      if (typeof fileContent === 'string') {
        const csvArray = csv.processCSV(fileContent);

        csv.CSV_ARRAY.set((value) => value.concat(csvArray));

        ui.toast(`Proceeded '${ui.truncate(file.name)}'!`, 'success');
      }
    };

    // Staart reading specified file
    reader.readAsText(file);
  });
};
