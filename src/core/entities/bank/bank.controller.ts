import { createState } from '@agile-ts/core';

import { persistBankData, unpersistBankData } from './bank.actions';
import { BankFileDataType } from './bank.types';

export const BANK_DATA = createState<BankFileDataType[]>([]);
export const IS_PERSISTED = createState(false).persist({
  key: 'is-bank-data-persisted',
});
IS_PERSISTED.watch((isPersisted) => {
  if (isPersisted) {
    persistBankData();
  } else {
    unpersistBankData();
  }
});
