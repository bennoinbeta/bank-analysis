import React from 'react';
import { ExtendedStylesType, StylesData } from '../../emotion';
import { MapToX } from '../../types';

export interface DefaultProps<TStyles = ExtendedStylesType<StylesData>> {
  style?: React.CSSProperties;
  className?: string;
  classNames?: MapToX<TStyles, string>;
  styles?: TStyles;
}
