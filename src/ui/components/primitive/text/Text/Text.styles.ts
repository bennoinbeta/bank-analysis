import { css } from '@emotion/react';
import createStyles from '../../../../../styles';

export default createStyles(
  (theme, { color, variant, size, inherit, gradient }) => {
    return {
      root: css`
        color: ${color != null ? color : theme.primitiveColors.black};
        font-family: ${inherit ? 'inherit' : 'roboto'};
        font-size: ${inherit ? 'inherit' : size};
        line-height: ${inherit ? 'inherit' : undefined};
        text-decoration: none;

        -webkit-tap-highlight-color: transparent;

        :hover {
          text-decoration: ${variant === 'link' ? 'underline' : 'none'};
        }
      `,

      gradient: css`
        background-image: linear-gradient(
          ${gradient.deg}deg,
          ${gradient.from} 0%,
          ${gradient.to} 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      `,
    };
  }
);
