import { css } from '@emotion/react';
import createStyles from '../../../../../styles';
import { TextProps } from './Text';

export default createStyles<TextProps<any>>(
  (
    theme,
    { color, variant, size, inherit, gradient, weight, transform, align }
  ) => {
    return {
      root: css`
        color: ${color != null ? color : theme.primitiveColors.black};
        font-family: ${inherit ? 'inherit' : 'roboto'};
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
    };
  }
);
