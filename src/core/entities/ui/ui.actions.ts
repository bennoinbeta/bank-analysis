import { ThemePaths } from './themes';
import {
  IS_LOADING,
  SHOW_GRAP,
  THEME_TYPE,
  ToastEventType,
  TOAST_EVENT,
} from './ui.controller';

export const toast = (message: string, type: ToastEventType = 'error') => {
  TOAST_EVENT.trigger({ message, type });
};

export const setIsLoading = (loading: boolean) => {
  IS_LOADING.set(loading);
};

export const setShowGraph = (showGraph: boolean) => {
  SHOW_GRAP.set(showGraph);
};

export const setTheme = (type: ThemePaths) => {
  THEME_TYPE.set(type);
};

// https://stackoverflow.com/questions/1199352/smart-way-to-truncate-long-strings
export const truncate = (str: string, max = 10): string => {
  return str.length > max ? str.substr(0, max - 1) + '..' : str;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
