import { createState } from '@agile-ts/core';

export const BANK_DATA = createState<BankFileDataType[]>([]);

export type BankFileDataType = {
  data: BankDataType[];
  name: string;
  parseTimestamp: number;
  valid: boolean;
};

export type BankDataType = {
  date: Date;
  'receiver/sender': string;
  currency: 'EUR';
  amount: string;
  'debit/credit': 'S' | 'D';
};
