import React from 'react';
import {
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../../../../styles';
import { useStyles, ExtractedStylesType } from './Input.styles';
import { AgileNumberSize, DefaultProps } from '../../../../../styles/theme';

const Input: InputComponent = React.forwardRef(
  <C extends React.ElementType = 'input'>(
    props: InputProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const {
      component,
      className,
      invalid = false,
      required = false,
      disabled = false,
      leftSection,
      rightSection,
      wrapperProps,
      multiline = false,
      radius = 'sm',
      size = 'sm',
      styles,
      style,
      classNames,
      __staticSelector = 'Input',
      ...others
    } = props;
    const { classes, cx } = useStyles(
      { size, multiline, disabled, radius, invalid, rightSection, leftSection },
      { name: __staticSelector, styles, classNames }
    );
    const Element: React.ElementType = component || 'input';

    return (
      <div
        className={cx(classes.root, className)}
        style={style}
        {...wrapperProps}>
        {leftSection && (
          <div className={classes.leftSection} {...leftSection?.props}>
            {leftSection.component}
          </div>
        )}

        <Element
          ref={ref}
          aria-required={required}
          aria-invalid={invalid}
          disabled={disabled}
          className={cx(
            {
              [classes.withLeftSection]: leftSection,
              [classes.withRightSection]: rightSection,
            },
            classes.input
          )}
          {...others}
        />

        {rightSection && (
          <div {...rightSection?.props} className={classes.rightSection}>
            {rightSection.component}
          </div>
        )}
      </div>
    );
  }
) as any;

export type InputBaseProps = {
  disabled?: boolean;
  multiline?: boolean;
  size?: AgileNumberSize;
  required?: boolean;
  invalid?: boolean;
  radius?: AgileNumberSize;

  leftSection?: {
    component: React.ReactNode;
    props?: React.ComponentPropsWithoutRef<'div'>;
    width?: number;
  };
  rightSection?: {
    component: React.ReactNode;
    props?: React.ComponentPropsWithoutRef<'div'>;
    width?: number;
  };
  wrapperProps?: React.ComponentPropsWithoutRef<'div'>;
};

export type InputProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  InputBaseProps &
    DefaultProps<ExtractedStylesType> & { __staticSelector?: string }
>;

type InputComponent = <C extends React.ElementType = 'input'>(
  props: InputProps<C>
) => React.ReactElement;

export default Input;
