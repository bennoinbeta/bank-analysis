import themes, { ThemeInterface, ThemePaths } from './themes';
import { createComputed, createState } from '@agile-ts/core';
import { createEvent } from '@agile-ts/event';

export type ToastEventType = 'error' | 'success' | 'warn';

export type ToastEventPayload = {
  type: ToastEventType;
  message: string;
};

export const TOAST_EVENT = createEvent<ToastEventPayload>();
TOAST_EVENT.on((payload) => {
  console.log('Event: ', payload);
});
export const THEME_TYPE = createState<ThemePaths>('dark').persist('theme');
export const THEME = createComputed<ThemeInterface>(() => {
  return themes[THEME_TYPE.value];
});
export const IS_LOADING = createState(false);
export const SHOW_GRAP = createComputed(() => {
  // TODO
  return false;
});
