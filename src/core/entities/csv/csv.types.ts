export type ParsedCSVDataType = {
  name: string;
  parseTimestamp: number;
  data: { [key: string]: any }[];
};
