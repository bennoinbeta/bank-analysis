import React from 'react';
import {
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../../../../types/Polymorphic';
import useStyles from './Text.styles';

export interface SharedTextProps {
  /** Predefined font-size from theme.fontSizes */
  size?: number;

  /** Text color */
  color?: string;

  /** Sets font-weight css property */
  weight?: React.CSSProperties['fontWeight'];

  /** Sets text-transform css property */
  transform?: 'capitalize' | 'uppercase' | 'lowercase';

  /** Sets text-align css property */
  align?: 'left' | 'center' | 'right';

  /** Link or text variant */
  variant?: 'text' | 'link' | 'gradient';

  /** CSS -webkit-line-clamp property */
  lineClamp?: number;

  /** Sets line-height to 1 for centering */
  inline?: boolean;

  /** Inherit font properties from parent element */
  inherit?: boolean;
}

export type TextProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  SharedTextProps
>;

type TextComponent = <C extends React.ElementType = 'p'>(
  props: TextProps<C>
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
      style,
      color,
      align,
      variant = 'text',
      lineClamp,
      inline = false,
      inherit = false,
      ...others
    } = props;
    const styles = useStyles(
      {
        variant,
        color,
        size,
        lineClamp,
        inline,
        inherit,
      },
      null,
      'text'
    );
    const Text = component || 'p';

    return React.createElement(
      Text,
      {
        ...others,
        ref,
        className: null, // cx(classes.root, className),
        // style: {
        //   fontWeight: inherit ? 'inherit' : weight,
        //   textTransform: transform,
        //   textAlign: align,
        //   color: color,
        //   size: size,
        //   fontSize: size,
        //   ...style,
        // },
      },
      children
    );
  }
) as any;

export default Text;
