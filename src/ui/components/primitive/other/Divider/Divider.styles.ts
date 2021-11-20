import { css } from '@emotion/react';

import { styleSheet } from '../../../../../styles';
import { AgileNumberSize } from '../../../../../styles/theme';
import { getSizeValue } from '../../../../../styles/theme/utils/getSizeValue';

export const dividerSizes = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
};

export const useStyles = styleSheet
  .withParams<DividerStyles>()
  .create(({ theme, params: { size, variant, color } }) => ({
    horizontal: css`
      border: 0;
      border-top-width: ${getSizeValue(size, dividerSizes)}px;
      border-top-color: ${color};
      border-top-style: ${variant};
      margin: 0;
    `,

    vertical: css`
      border: 0;
      border-left-width: ${getSizeValue(size, dividerSizes)}px;
      border-left-color: ${color};
      border-left-style: ${variant};
      margin: 0;
    `,
  }));

type DividerStyles = {
  size: AgileNumberSize;
  variant: string;
  color: string;
};
