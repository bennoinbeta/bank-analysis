import React from 'react';
import {
  AgileNumberSize,
  DefaultProps,
  useAgileTheme,
} from '../../../../../styles/theme';
import { useStyles } from './Divider.styles';

const Divder = React.forwardRef<HTMLDivElement, DividerProps>((props, ref) => {
  const {
    className,
    color,
    orientation = 'horizontal',
    size = 'xs',
    variant = 'solid',
    styles = {},
    classNames = {},
    ...others
  } = props;
  const theme = useAgileTheme();
  const { classes, cx } = useStyles(
    { color: color ?? theme.colors.layout.rHc, size, variant },
    { name: 'Divider', classNames, styles }
  );

  return (
    <div
      ref={ref}
      className={cx(
        {
          [classes.vertical]: orientation === 'vertical',
          [classes.horizontal]: orientation === 'horizontal',
        },
        className
      )}
      {...others}
    />
  );
});

export default Divder;

export type DividerBaseProps = {
  color?: string;
  orientation?: 'horizontal' | 'vertical';
  size?: AgileNumberSize;
  variant?: 'solid' | 'dashed' | 'dotted';
} & React.ComponentPropsWithoutRef<'div'>;

export type DividerProps = DividerBaseProps & DefaultProps<any>;
