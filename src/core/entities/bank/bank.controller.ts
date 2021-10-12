import { createState } from '@agile-ts/core';

export const BANK_DATA = createState<BankFileDataType[]>([]);

type BankFileDataType = {
  data: BankDataType[];
  name: string;
  parseTimestamp: number;
};

type BankDataType = {
  date: Date;
  'receiver/sender': string;
  currency: 'EUR';
  amount: string;
  'debit/credit': 'S' | 'D';
};
