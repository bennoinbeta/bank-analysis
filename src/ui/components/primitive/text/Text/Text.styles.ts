import { css, SerializedStyles } from '@emotion/react';
import { TextProps } from './Text';
import {
  createStyles,
  ExtractStylesType,
} from '../../../../../styles/emotion/createStyles';
import { AgileTheme } from '../../../../../styles/theme';

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

export const useStyles = createStyles<TextProps>()(
  (
    theme,
    { color, variant, size, inherit, gradient, weight, transform, align }
  ) => ({
    root: css`
      ${getTextColor({ color, theme, variant })};
      font-family: ${inherit ? 'inherit' : 'sans-serif'};
      font-size: ${inherit ? 'inherit' : size + 'px'};
      line-height: ${inherit ? 'inherit' : undefined};
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

    gradient: css`
      background: linear-gradient(
        ${gradient?.deg}deg,
        ${gradient?.from} 0%,
        ${gradient?.to} 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `,
  })
);

type GetTextColor = {
  theme: AgileTheme;
  color?: string;
  variant: TextProps['variant'];
};

export type ExtractedStylesType = ExtractStylesType<typeof useStyles>;
