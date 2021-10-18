import { copy } from '@agile-ts/utils';
import { createState } from '@agile-ts/core';
import { BankFileDataType } from './bank.types';

export const BANK_DATA = createState<BankFileDataType[]>([]).persist({
  key: 'bank-data',
  onSave: (value: BankFileDataType[]) => {
    return copy(value).map((bankFileData) => {
      const newBankFileData = bankFileData;
      newBankFileData.data = newBankFileData.data.map((data) => {
        data.date = data.date.getTime() as any;
        return data;
      });
      return newBankFileData;
    });
  },
  onMigrate: (value) => {
    return value.map((bankFileData: any) => {
      const newBankFileData = bankFileData as BankFileDataType;
      newBankFileData.data = newBankFileData.data.map((data) => {
        data.date = new Date(data.date);
        return data;
      });
      return newBankFileData;
    });
  },
}); // TODO remove persist (just for faster debugging!)
