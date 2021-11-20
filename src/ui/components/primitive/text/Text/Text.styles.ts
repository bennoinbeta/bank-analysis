import React from 'react';

import { SerializedStyles, css } from '@emotion/react';
import { UseStylesExtractStylesType } from 'dynamic-styles';

import { styleSheet } from '../../../../../styles';
import {
  AgileGradient,
  AgileNumberSize,
  AgileTheme,
} from '../../../../../styles/theme';
import { getFontStyles } from '../../../../../styles/theme/utils/commonStyles';

function getTextColor(config: GetTextColor): SerializedStyles {
  const color =
    config.color != null
      ? config.color
      : config.variant === 'link'
      ? config.theme.colors.layout.p
      : config.theme.colors.layout.hc;

  return css`
    color: ${color};
  `;
}

export const useStyles = styleSheet
  .withParams<TextStyles>()
  .create(
    ({
      theme,
      params: { color, variant, size, gradient, weight, transform, align },
    }) => ({
      root: css`
        ${getTextColor({ color, theme, variant })};
        ${getFontStyles({ theme, size })}
        text-decoration: none;
        font-weight: ${weight};
        text-transform: ${transform};
        text-align: ${align};
        margin: 0;

        -webkit-tap-highlight-color: transparent;

        :hover {
          text-decoration: ${variant === 'link' ? 'underline' : 'none'};
        }
      `,

      withInherit: css`
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
      `,

      gradient: css`
        background: linear-gradient(
          ${gradient?.deg}deg,
          ${gradient?.from} 0%,
          ${gradient?.to} 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      `,
      test: { backgroundColor: 'red' },
    })
  );

type TextStyles = {
  color?: string;
  variant: 'text' | 'link' | 'gradient';
  size: AgileNumberSize;
  lineClamp?: number;
  inline: boolean;
  gradient: AgileGradient;
  weight: React.CSSProperties['fontWeight'];
  transform?: 'capitalize' | 'uppercase' | 'lowercase';
  align?: 'left' | 'center' | 'right';
};

type GetTextColor = {
  theme: AgileTheme;
  color?: string;
  variant: TextStyles['variant'];
};

export type ExtractedStylesType = UseStylesExtractStylesType<typeof useStyles>;
