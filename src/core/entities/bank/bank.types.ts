export type BankFileDataType = {
  data: BankDataType[];
  name: string;
  parseTimestamp: number;
  valid: boolean;
};

export type BankDataType = {
  date: Date;
  'receiver/sender'?: string;
  currency: 'EUR';
  amount: number;
  'debit/credit': 'D' | 'C';
};

export type DatasetType = {
  labels: string[];
  endAmounts: number[];
  creditDebitAmounts: { credit: number; debit: number }[];
  tagAmounts: { [key: string]: number }[];
};

export type BankDataPaths<T> = {
  [K in keyof T]: T[K] extends any ? K : never;
}[keyof T] &
  string;

export type TimeFormat = 'month' | 'day' | 'year';
export type DatasetFormat = 'endAmounts' | 'creditDebitAmounts';
