import { createState } from "@agile-ts/core";

export const PARSED_CSV_FILES = createState<ParsedCSVDataType>([]);

type ParsedCSVDataType =  {
    name: string,
    parseTimestamp: number
    data: { [key: string]: any }[],
}[]

