import { createState } from '@agile-ts/core';
import { ParsedCSVDataType } from './csv.types';

export const PARSED_CSV_FILES = createState<ParsedCSVDataType[]>([]);
