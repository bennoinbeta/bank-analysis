import { ExtractStylesType } from 'create-styles';
import { AgileNumberSize } from '../../../../../styles/theme';
import { createStyles } from '../../../../../styles';
import { getSizeValue } from '../../../../../styles/theme/utils/getSizeValue';
import { css } from '@emotion/react';

const switchHeight = {
  xs: 14,
  sm: 18,
  md: 22,
  lg: 28,
  xl: 34,
};

const switchWidth = {
  xs: 28,
  sm: 36,
  md: 42,
  lg: 54,
  xl: 66,
};

const handleSizes = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 26,
};

export const useStyles = createStyles<SwitchStyles>()(
  ({ theme, params: { size, radius, color } }) => {
    const handleSize = getSizeValue(size, handleSizes);
    const borderRadius = getSizeValue(radius, theme.radius);

    return {
      root: css`
        display: flex;
        align-items: center;
      `,

      input: css`
        display: flex;
        align-items: center;
        position: relative;

        box-sizing: border-box;
        appearance: none;

        margin: 0;

        border-radius: ${borderRadius}px;
        background-color: ${theme.colors.layout.lc};
        border: 1px solid ${theme.colors.layout.rHc};

        height: ${getSizeValue(size, switchHeight)}px;
        width: ${getSizeValue(size, switchWidth)}px;
        min-width: ${getSizeValue(size, switchWidth)}px;

        transition: background-color,
          border-color ${theme.transitionTimingFunction} 150ms;

        // Handle
        :before {
          content: '';
          display: block;

          height: ${handleSize}px;
          width: ${handleSize}px;
          border-radius: ${borderRadius}px;

          background-color: ${theme.colors.layout.bg};
          border: 1px solid ${theme.colors.layout.rHc};

          transform: translateX(${size === 'xs' ? 1 : 2}px);
        }

        :checked {
          background-color: ${color ?? theme.colors.interactive.primary.pM2};

          :before {
            background-color: ${theme.colors.layout.bg};

            transform: translateX(
              ${getSizeValue(size, switchWidth) -
              getSizeValue(size, handleSizes) -
              (size === 'xs' ? 4 : 5)}px
            );
          }
        }

        :disabled {
          cursor: not-allowed;

          background-color: ${theme.colors.disabled.d1};
          border-color: ${theme.colors.disabled.d2};

          :before {
            background-color: ${theme.primitiveColors.white};
            border-color: ${theme.colors.layout.rHc};
          }
        }
      `,

      label: css`
        font-size: ${getSizeValue(size, theme.fontSizes)}px;
        font-family: ${theme.fontFamily};
        margin-left: ${theme.spacing.sm}px;
        color: ${theme.colors.layout.hc};
      `,
    };
  }
);

type SwitchStyles = {
  color?: string;
  size: AgileNumberSize;
  radius: AgileNumberSize;
};

export type ExtractedStylesType = ExtractStylesType<typeof useStyles>;
