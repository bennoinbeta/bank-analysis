import { css } from '@emotion/react';
import createStyles from '../../../../../styles';

export default createStyles((theme, { color, variant, size, inherit }) => {
  return {
    root: css`
      color: ${color != null ? color : theme.primitiveColors.black};
      font-family: ${inherit ? 'inherit' : 'roboto'};
      font-size: ${inherit ? 'inherit' : size};
      line-height: ${inherit ? 'inherit' : size * 1.2};
      text-decoration: none;

      -webkit-tap-highlight-color: transparent;

      :hover {
        text-decoration: ${variant === 'link' ? 'underline' : 'none'};
      }
    `,

    gradient: css``,
  };
});
