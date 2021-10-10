import csv from './entities/csv';
import ui from './entities/ui';
import { globalBind } from '@agile-ts/core';

const core = {
  ui,
  csv,
};

// For better debugging
if (process.env.NODE_ENV !== 'production') globalBind('__core__', core);

export default core;

export {ui, csv};


