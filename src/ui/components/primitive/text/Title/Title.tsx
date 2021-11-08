import React, { forwardRef } from 'react';
import { useStyles } from './Title.styles';
import { DefaultProps } from '../../../../../styles/theme';
import { jsx } from '@emotion/react';

const Title = forwardRef<HTMLHeadingElement, TitleProps>((props, ref) => {
  const {
    className,
    element = 'h1',
    children,
    align,
    styles,
    ...others
  } = props;
  const Element: React.ElementType = element;
  const { classes, cx } = useStyles(
    { element: Element },
    { name: 'Title', styles }
  );

  // Check if specified order is valid
  if (!['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(element)) {
    return null;
  }

  // jsx == React.createElement but with 'css' support
  // https://github.com/emotion-js/emotion/issues/1368
  return jsx(
    Element,
    {
      className: cx(classes.root, className),
      ref,
      ...others,
    },
    children
  );
});

export default Title;

export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface TitleProps
  extends DefaultProps,
    React.ComponentPropsWithoutRef<'h1'> {
  element?: HeadingElement;
  align?: 'right' | 'left' | 'center';
}
