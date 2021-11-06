import { createStyles } from '../../../../../styles/emotion/createStyles';

export const useStyles = createStyles<TitleStyles>()((theme, { element }) => ({
  root: {
    fontFamily: theme.headings.fontFamily,
    fontWeight: theme.headings.fontWeight,
    fontSize: theme.headings.sizes[element].fontSize,
    lineHeight: theme.headings.sizes[element].lineHeight,
    margin: 0,
    color: theme.colors.layout.hc,
  },
}));

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TitleStyles {
  element: HeadingElement;
}
