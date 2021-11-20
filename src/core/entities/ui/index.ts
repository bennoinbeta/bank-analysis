import * as themes from './themes';
import * as actions from './ui.actions';
import * as controller from './ui.controller';

export default {
  ...actions,
  ...controller,
  themes,
};
