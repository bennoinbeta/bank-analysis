import React from 'react';
import { useStyles, ExtractedStylesType } from './Switch.styles';
import { AgileNumberSize, DefaultProps } from '../../../../../styles/theme';
import { useId } from '../../../../hooks/useId';

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
  const {
    className,
    color,
    label,
    style,
    size = 'sm',
    radius = 'xl',
    wrapperProps,
    children,
    classNames,
    styles,
    ...others
  } = props;
  const { classes, cx } = useStyles(
    { size, color, radius },
    { classNames, styles, name: 'Switch' }
  );
  const id = useId();

  return (
    <div
      {...wrapperProps}
      className={cx(classes.root, className)}
      style={style}>
      <input
        {...others}
        id={id}
        ref={ref}
        type="checkbox"
        className={classes.input}
      />

      {label && (
        <label className={classes.label} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
});

export default Switch;

export type BaseSwitchProps = {
  label?: React.ReactNode;
  color?: string;
  size?: AgileNumberSize;
  radius?: AgileNumberSize;
  wrapperProps?: React.ComponentPropsWithoutRef<'div'>;
};

export type SwitchProps = BaseSwitchProps &
  DefaultProps<ExtractedStylesType> &
  Omit<React.ComponentPropsWithoutRef<'input'>, 'type' | 'size'>;
