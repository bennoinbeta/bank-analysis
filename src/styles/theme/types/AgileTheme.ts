import React from 'react';
import { Colors } from './AgileColors';
import { Sizes } from './AgileSize';
import { DeepPartial } from '../../types';

export interface AgileTheme {
  colors: Colors;
  fontFamily: React.CSSProperties['fontFamily'];
  lineHeight: React.CSSProperties['lineHeight'];

  fontSizes: Sizes<number>;
  radius: Sizes<number>;
  spacing: Sizes<number>;
  shadows: Sizes<string>;

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

export interface HeadingStyle {
  fontSize: React.CSSProperties['fontSize'];
  lineHeight: React.CSSProperties['lineHeight'];
}

export type ThemePaths<T> = {
  [K in keyof T]: T[K] extends any ? K : never;
}[keyof T] &
  string;

export type AgileThemeObject = {
  theme: AgileTheme;
  type: string;
  primitiveColors: Record<string, string | string[]>;
};

export type AgileOverwriteTheme = DeepPartial<AgileTheme>;
