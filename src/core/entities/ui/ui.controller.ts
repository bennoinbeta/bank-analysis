import { BANK_DATA } from './../bank/bank.controller';
import themes from './themes';
import { createComputed, createState } from '@agile-ts/core';
import { createEvent } from '@agile-ts/event';
import { ThemeInterface, ThemePaths, ToastEventPayload } from './ui.types';

export const TOAST_EVENT = createEvent<ToastEventPayload>();
TOAST_EVENT.on((payload) => {
  console.log('Event: ', payload);
});
export const THEME_TYPE = createState<ThemePaths>('dark').persist({
  key: 'theme',
});
export const THEME = createComputed<ThemeInterface>(() => {
  return themes[THEME_TYPE.value];
});
export const IS_LOADING = createState(false);
export const SHOW_GRAP = createComputed(() => {
  return BANK_DATA.value.length > 0;
});
