import { csv, ui } from '../../../../../core';
import bank from '../../../../../core/entities/bank';
import { BankFileDataType } from '../../../../../core/entities/bank/bank.types';

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

export const getTotalData = (file: BankFileDataType, fixed = 2) => {
  let totalDebit = 0;
  let totalCredit = 0;

  file.data.forEach((item) => {
    if (item['debit/credit'] === 'D') totalDebit += item.amount;
    else if (item['debit/credit'] === 'C') totalCredit += item.amount;
  });

  return {
    totalCredit: totalCredit.toFixed(fixed),
    totalDebit: totalDebit.toFixed(fixed),
  };
};
