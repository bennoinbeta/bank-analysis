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

// {
//   labels: ['26.07.2021', '27.07.2021', ..],
//   endAmounts: [-12.58, 0 ..] // end amount that arose of each day
//   creditDebitAmounts: {
//      credit: [0, ..] // Total credit of each day
//      debit: [12.58, 0, ..] // Total debit of each day
//   },
//   tagAmounts: {
//      consumption: [], // Total amount used for consumption
//      investment: [],
//      salary: []
//   }
// }
export type DatasetType = {
  labels: string[];
  endAmounts: number[];
  creditDebitAmounts: { credit: number[]; debit: number[] };
  tagAmounts: { [key: string]: number[] };
};

export type BankDataPaths<T> = {
  [K in keyof T]: T[K] extends any ? K : never;
}[keyof T] &
  string;
