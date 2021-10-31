import { css, SerializedStyles } from '@emotion/react';
import { ThemeInterface } from '../../../../../core/entities/ui/ui.types';
import { createStyles } from '../../../../../styles';
import { TextProps } from './Text';

type GetTextColor = {
  theme: ThemeInterface;
  color?: string;
  variant: TextProps<any>['variant'];
};

function getTextColor(config: GetTextColor): SerializedStyles {
  const color =
    config.color != null
      ? config.color
      : config.variant === 'link'
      ? config.theme.primitiveColors.purple_darker
      : config.theme.primitiveColors.black;

  return css`
    color: ${color};
  `;
}

export const useStyles = createStyles<TextProps<any>>(
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

      -webkit-tap-highlight-color: transparent;

      :hover {
        text-decoration: ${variant === 'link' ? 'underline' : 'none'};
      }
    `,

    gradient: css`
      background-image: linear-gradient(
        ${gradient?.deg}deg,
        ${gradient?.from} 0%,
        ${gradient?.to} 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `,
  })
);
