import React from 'react';

import { DeepPartial } from '../../types';
import { Colors } from './AgileColors';
import { AgileSizes } from './AgileSize';

export interface DefaultAgileTheme {
  type: string;
  colors: Colors;
  primitiveColors: Record<string, string | string[]>;
  fontFamily: React.CSSProperties['fontFamily'];
  lineHeight: React.CSSProperties['lineHeight'];
  transitionTimingFunction: React.CSSProperties['transitionTimingFunction'];

  fontSizes: AgileSizes<number>;
  radius: AgileSizes<number>;
  spacing: AgileSizes<number>;
  shadows: AgileSizes<string>;

  headings: {
    fontFamily: React.CSSProperties['fontFamily'];
    fontWeight: React.CSSProperties['fontWeight'];
    sizes: {
      h1: HeadingStyle;
      h2: HeadingStyle;
      h3: HeadingStyle;
      h4: HeadingStyle;
      h5: HeadingStyle;
      h6: HeadingStyle;
    };
  };
}

export interface AgileTheme extends DefaultAgileTheme {}

export interface HeadingStyle {
  fontSize: React.CSSProperties['fontSize'];
  lineHeight: React.CSSProperties['lineHeight'];
}

export type ThemePaths<T> = {
  [K in keyof T]: T[K] extends any ? K : never;
}[keyof T] &
  string;

export type AgileOverwriteTheme = DeepPartial<AgileTheme>;
