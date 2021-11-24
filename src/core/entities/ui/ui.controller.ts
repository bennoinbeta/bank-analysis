import { createState } from '@agile-ts/core';
import { createEvent } from '@agile-ts/event';

import { ThemeTypes } from './themes';
import { ToastEventPayload } from './ui.types';

export const TOAST_EVENT = createEvent<ToastEventPayload>();
TOAST_EVENT.on((payload) => {
  console.log('Event: ', payload);
});
export const THEME_TYPE = createState<ThemeTypes>('dark').persist({
  key: 'theme',
});
export const IS_LOADING = createState(false);

export const MAX_WIDTH = 1100;
export const NAVBAR_HEIGHT = 70;
