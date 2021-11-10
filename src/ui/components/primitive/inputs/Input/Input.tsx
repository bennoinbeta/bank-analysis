import React from 'react';
import {
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../../../../../styles';
import { useStyles } from './Input.styles';
import { AgileNumberSize, DefaultProps } from '../../../../../styles/theme';

const BaseInput: InputComponent = React.forwardRef(
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
      radius,
      size = 'md',
      styles,
      ...other
    } = props;
    const { classes, cx } = useStyles(
      { size, multiline, disabled, radius, invalid },
      { styles }
    );
    const Element: React.ElementType = component || 'input';

    return (
      <div className={cx(classes.root, className)} {...wrapperProps}>
        {leftSection && (
          <div className={classes.leftSection} {...leftSection?.props}>
            {leftSection.component}
          </div>
        )}

        <Element
          {...other}
          ref={ref}
          aria-required={required}
          aria-invalid={invalid}
          disabled={disabled}
          className={cx(
            { [classes.withLeftSection]: leftSection },
            classes.input
          )}
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

export type BaseInputProps = {
  disabled?: boolean;
  multiline?: boolean;
  size?: AgileNumberSize;
  required?: boolean;
  invalid?: boolean;

  leftSection?: {
    component: React.ReactNode;
    props?: React.ComponentPropsWithoutRef<'div'>;
  };
  rightSection?: {
    component: React.ReactNode;
    props?: React.ComponentPropsWithoutRef<'div'>;
  };
  wrapperProps?: React.ComponentPropsWithoutRef<'div'>;
};

export type InputProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  BaseInputProps & DefaultProps
>;

type InputComponent = <C extends React.ElementType = 'input'>(
  props: InputProps<C>
) => React.ReactElement;

export default BaseInput;
