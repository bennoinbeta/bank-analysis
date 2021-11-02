import React from 'react';
import { ExtendedStylesType, StylesData } from '../../emotion';

export interface DefaultProps<TStyles = ExtendedStylesType<StylesData>> {
  style?: React.CSSProperties,
  className?: string;
  styles?: TStyles;
}
