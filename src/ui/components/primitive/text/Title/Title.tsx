import React, { forwardRef } from 'react';
import { ExtractedStylesType, useStyles } from './Title.styles';
import { DefaultProps } from '../../../../../styles/theme';

const Title = forwardRef<HTMLHeadingElement, TitleProps>((props, ref) => {
  const {
    className,
    element = 'h1',
    children,
    align,
    styles = {},
    classNames = {},
    ...others
  } = props;
  const Element: React.ElementType = element;
  const { classes, cx } = useStyles(
    { element: Element },
    { name: 'Title', styles, classNames }
  );

  // Check if specified order is valid
  if (!['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(element)) {
    return null;
  }

  return (
    <Element {...others} ref={ref} className={cx(classes.root, className)}>
      {children}
    </Element>
  );
});

export default Title;

export type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TitleBaseProps = {
  element?: HeadingElement;
  align?: 'right' | 'left' | 'center';
} & React.ComponentPropsWithoutRef<'h1'>;

export type TitleProps = TitleBaseProps & DefaultProps<ExtractedStylesType>;
