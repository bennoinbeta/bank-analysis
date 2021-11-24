import React from 'react';

import { ExpandedStylesType, StylesData } from '@dyst/react';

import { MapToX } from '../../types';
import { AgileTheme } from './AgileTheme';

export interface DefaultProps<
  TStyles = ExpandedStylesType<StylesData, AgileTheme>
> {
  style?: React.CSSProperties;
  className?: string;
  classNames?: MapToX<TStyles, string>;
  styles?: TStyles;
}
