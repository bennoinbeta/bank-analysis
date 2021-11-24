import { globalBind, shared } from '@agile-ts/core';
import reactIntegration from '@agile-ts/react';

import bank from './entities/bank';
import csv from './entities/csv';
import money from './entities/money';
import ui from './entities/ui';
import utils from './entities/utils';

const core = {
  bank,
  ui,
  csv,
  money,
  utils,
};

// Integrate React as the auto integration is buggy in production
shared.integrate(reactIntegration);

// For better debugging
if (process.env.NODE_ENV !== 'production') globalBind('__core__', core);

export default core;

export { ui, csv, money, bank, utils };
