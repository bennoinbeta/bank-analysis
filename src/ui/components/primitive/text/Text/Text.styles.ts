import { css } from '@emotion/react';

export default createStyles((theme, { color, variant, size, inherit }: any) => {
  return {
    root: css`
      color: ${color};
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
