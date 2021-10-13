import bank from './entities/bank';
import csv from './entities/csv';
import ui from './entities/ui';
import money from './entities/money';
import utils from './entities/utils';

import { globalBind } from '@agile-ts/core';

const core = {
  bank,
  ui,
  csv,
  money,
  utils,
};

// For better debugging
if (process.env.NODE_ENV !== 'production') globalBind('__core__', core);

export default core;

export { ui, csv, money, bank, utils };
