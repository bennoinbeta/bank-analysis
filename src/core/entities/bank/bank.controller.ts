import { createState } from '@agile-ts/core';
import { BankFileDataType } from './bank.types';

export const BANK_DATA = createState<BankFileDataType[]>([]).persist(
  'bank-data'
); // TODO remove persist (just for faster debugging!)
