import { styleSheet } from '../../../../../styles';
import { UseStylesExtractStylesType } from 'dynamic-styles';
import { HeadingElement } from './Title';

export const useStyles = styleSheet
  .withParams<TitleStyles>()
  .create(({ theme, params: { element } }) => ({
    root: {
      fontFamily: theme.headings.fontFamily,
      fontWeight: theme.headings.fontWeight,
      fontSize: theme.headings.sizes[element].fontSize,
      lineHeight: theme.headings.sizes[element].lineHeight,
      margin: 0,
      color: theme.colors.layout.hc,
    },
  }));

type TitleStyles = {
  element: HeadingElement;
};

export type ExtractedStylesType = UseStylesExtractStylesType<typeof useStyles>;
