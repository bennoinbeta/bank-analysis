import React from 'react';
import {
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../../../../styles';
import { ExtractedStylesType, useStyles } from './Text.styles';
import { jsx } from '@emotion/react';
import { DefaultProps, Gradient } from '../../../../../styles/theme';

export interface SharedTextProps {
  size?: number;
  color?: string;
  weight?: React.CSSProperties['fontWeight'];
  transform?: 'capitalize' | 'uppercase' | 'lowercase';
  align?: 'left' | 'center' | 'right';
  variant?: 'text' | 'link' | 'gradient';
  lineClamp?: number;
  inline?: boolean;
  inherit?: boolean;
  gradient?: Gradient;
}

export type TextProps<C extends React.ElementType = 'p'> =
  PolymorphicComponentProps<C, SharedTextProps>;

type TextComponent = <C extends React.ElementType = 'p'>(
  props: TextProps<C> & DefaultProps<ExtractedStylesType>
) => React.ReactElement;

const Text: TextComponent = React.forwardRef(
  <C extends React.ElementType = 'p'>(
    props: TextProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const {
      className,
      component,
      children,
      size = 18,
      weight,
      transform,
      color,
      variant = 'text',
      lineClamp,
      gradient = { from: 'blue', to: 'red', deg: 45 },
      inline = false,
      inherit = false,
      align,
      styles,
      ...others
    } = props;
    const { cx, classes } = useStyles(
      {
        variant,
        color,
        size,
        lineClamp,
        inline,
        inherit,
        gradient,
        weight,
        transform,
        align,
      },
      { name: 'text', styles }
    );
    const Element: React.ElementType = component || 'p';

    // jsx == React.createElement but with 'css' support
    // https://github.com/emotion-js/emotion/issues/1368
    return jsx(
      Element,
      {
        ref,
        className: cx(
          classes.root,
          { [classes.gradient]: variant === 'gradient' },
          className
        ),
        ...others,
      },
      children
    );
  }
) as any;

export default Text;
