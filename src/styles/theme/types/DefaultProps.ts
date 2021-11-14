import React from 'react';
import { MapToX } from '../../types';
import { ExtendedStylesType, StylesData } from 'create-styles';
import { AgileTheme } from './AgileTheme';

export interface DefaultProps<
  TStyles = ExtendedStylesType<StylesData, AgileTheme>
> {
  style?: React.CSSProperties;
  className?: string;
  classNames?: MapToX<TStyles, string>;
  styles?: TStyles;
}
