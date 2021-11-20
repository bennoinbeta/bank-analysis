import React from 'react';
import { MapToX } from '../../types';
import { ExpandedStylesType, StylesData } from 'dynamic-styles';
import { AgileTheme } from './AgileTheme';

export interface DefaultProps<
  TStyles = ExpandedStylesType<StylesData, AgileTheme>
> {
  style?: React.CSSProperties;
  className?: string;
  classNames?: MapToX<TStyles, string>;
  styles?: TStyles;
}
