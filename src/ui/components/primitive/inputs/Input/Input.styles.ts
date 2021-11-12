import { createStyles, ExtractStylesType } from '../../../../../styles';
import { AgileNumberSize, AgileTheme } from '../../../../../styles/theme';
import { css } from '@emotion/react';
import { getSizeValue } from '../../../../../styles/theme/utils/getSizeValue';
import { InputBaseProps } from './Input';
import React from 'react';

export const inputSizes = {
  xs: 30,
  sm: 36,
  md: 42,
  lg: 50,
  xl: 60,
};

function getInvalidStyles({
  invalid,
  theme,
}: {
  invalid: InputStyles['invalid'];
  theme: AgileTheme;
}) {
  if (!invalid) {
    return null;
  }

  const color = theme.colors.denotive.error;

  return css`
    color: ${color};
    border-color: ${color};

    &::placeholder {
      opacity: 1;
      color: ${color};
    }
  `;
}

function getDisabledStyles({
  disabled,
  theme,
}: {
  disabled: InputStyles['disabled'];
  theme: AgileTheme;
}) {
  return disabled
    ? css`
            background-color: ${theme.colors.disabled.d1}
            color: ${theme.colors.disabled.d2};
            opacity: 0.6;
            cursor: not-allowed;

            &::placeholder {
              color: ${theme.colors.disabled.d2},
            },
      `
    : null;
}

export const useStyles = createStyles<InputStyles>()(
  (
    theme,
    { size, multiline, radius, invalid, disabled, rightSection, leftSection }
  ) => {
    return {
      root: css`
        position: relative;
        border-radius: ${getSizeValue(radius, theme.radius)};
      `,

      input: css`
        display: block;
        text-align: left;
        appearance: none;
        resize: none;
        box-sizing: border-box;

        width: 100%;

        height: ${multiline ? 'auto' : getSizeValue(size, inputSizes)};
        min-height: ${getSizeValue(size, inputSizes)}px;
        line-height: ${
          multiline
            ? theme.lineHeight
            : `${getSizeValue(size, inputSizes) - 2}px`
        };

        -webkit-tap-highlight-color: transparent;

        padding-left: ${getSizeValue(size, inputSizes) / 3}px;
        padding-right: ${getSizeValue(size, inputSizes) / 3}px;

        font-size: ${getSizeValue(size, theme.fontSizes)}px;

        color: ${theme.colors.layout.hc};
        background-color: ${theme.colors.layout.lc};
        border-color: ${theme.colors.layout.rHc};
        border-style: solid;
        border-width: 1px;
        border-radius: ${getSizeValue(radius, theme.radius)}px;

        transition: border-color 100ms ease, box-shadow 100ms ease;

        ${getDisabledStyles({ disabled, theme })}
        ${getInvalidStyles({ invalid, theme })}

        &:focus,
        &:focus-within {
          outline: none;
          border-color: ${!invalid && theme.colors.interactive.primary.p0};
        }

        &:disabled {
          color: ${theme.colors.disabled.d1};
          background-color: ${theme.colors.disabled.d2};
          opacity: 70%;
          cursor: not-allowed;
        }

        &::placeholder {
          opacity: 1;
          user-select: none;
          color: ${theme.colors.layout.rHc},
        },

        &::-webkit-inner-spin-button, &::-webkit-outer-spin-button, &::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration:
        {
          appearance: none;
        },
        
        &[type=number] {
          -moz-appearance: textfield
        },
      `,

      withLeftSection: css`
        padding-left: ${leftSection?.width ??
        getSizeValue(size, inputSizes) / 1.1}px !important;
      `,

      withRightSection: css`
        padding-right: ${rightSection?.width ??
        getSizeValue(size, inputSizes)}px !important;
      `,

      leftSection: css`
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        bottom: 0;

        width: ${leftSection?.width ?? getSizeValue(size, inputSizes)}px;

        display: flex;
        align-items: center;
        justify-content: center;

        pointer-events: none;
        color: ${invalid
          ? theme.colors.denotive.error
          : theme.colors.layout.rHc};
      `,

      rightSection: css`
        position: absolute;
        z-index: 1;
        top: 0;
        bottom: 0;
        right: 0;

        width: ${leftSection?.width ?? getSizeValue(size, inputSizes)}px;

        display: flex;
        align-items: center;
        justify-content: center;
      `,
    };
  }
);

interface InputStyles {
  radius: AgileNumberSize;
  size: AgileNumberSize;
  multiline: boolean;
  invalid: boolean;
  disabled: boolean;
  rightSection?: {
    component: React.ReactNode;
    props?: React.ComponentPropsWithoutRef<'div'>;
    width?: number;
  };
  leftSection?: {
    component: React.ReactNode;
    props?: React.ComponentPropsWithoutRef<'div'>;
    width?: number;
  };
}

export type ExtractedStylesType = ExtractStylesType<typeof useStyles>;
