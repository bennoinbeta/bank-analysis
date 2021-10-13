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
  amount: number;
  'debit/credit': 'D' | 'C';
};

export type MonthDatasetType = {
  name: string;
  dataset: { [key: string]: { labels: string[]; data: number[] } }; // e.g. {2021: {labels: [..], data: [..]}}
};

export type BankDataPaths<T> = {
  [K in keyof T]: T[K] extends any ? K : never;
}[keyof T] &
  string;
