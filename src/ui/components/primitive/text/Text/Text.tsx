import React from 'react';

import {
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../../../../styles';
import {
  AgileGradient,
  AgileNumberSize,
  DefaultProps,
} from '../../../../../styles/theme';
import { ExtractedStylesType, useStyles } from './Text.styles';

const Text: TextComponent = React.forwardRef(
  <C extends React.ElementType = 'p'>(
    props: TextProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const {
      className,
      component,
      children,
      size = 'sm',
      weight,
      transform,
      color,
      variant = 'text',
      lineClamp,
      gradient = { from: 'blue', to: 'red', deg: 45 },
      inline = false,
      inherit = false,
      align,
      styles = {},
      classNames = {},
      ...others
    } = props;
    const { cx, classes } = useStyles(
      {
        variant,
        color,
        size,
        lineClamp,
        inline,
        gradient,
        weight,
        transform,
        align,
      },
      { name: 'Text', classNames, styles }
    );
    const Element: React.ElementType = component || 'p';

    return (
      <Element
        {...others}
        ref={ref}
        className={cx(
          classes.root,
          {
            [classes.gradient]: variant === 'gradient',
            [classes.withInherit]: inherit,
          },
          className
        )}
      >
        {children}
      </Element>
    );
  }
) as any;

export default Text;

export type BaseTextProps = {
  size?: AgileNumberSize;
  color?: string;
  weight?: React.CSSProperties['fontWeight'];
  transform?: 'capitalize' | 'uppercase' | 'lowercase';
  align?: 'left' | 'center' | 'right';
  variant?: 'text' | 'link' | 'gradient';
  lineClamp?: number;
  inline?: boolean;
  inherit?: boolean;
  gradient?: AgileGradient;
};

export type TextProps<C extends React.ElementType = 'p'> =
  PolymorphicComponentProps<
    C,
    BaseTextProps & DefaultProps<ExtractedStylesType>
  >;

type TextComponent = <C extends React.ElementType = 'p'>(
  props: TextProps<C>
) => React.ReactElement;
