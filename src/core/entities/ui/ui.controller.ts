import { createState } from '@agile-ts/core';
import { createEvent } from '@agile-ts/event';
import { ThemePaths, ToastEventPayload } from './ui.types';

export const TOAST_EVENT = createEvent<ToastEventPayload>();
TOAST_EVENT.on((payload) => {
  console.log('Event: ', payload);
});
export const THEME_TYPE = createState<ThemePaths>('dark').persist({
  key: 'theme',
});
export const IS_LOADING = createState(false);
