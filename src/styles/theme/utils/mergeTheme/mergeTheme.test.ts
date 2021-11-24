import { DEFAULT_THEME } from '../../default-theme';
import { mergeTheme } from './index';

describe('@agile/mergeTheme', () => {
  it('shallow merges non-object properties', () => {
    expect(
      mergeTheme(DEFAULT_THEME, { fontFamily: 'inherit', type: 'special' })
    ).toEqual({
      ...DEFAULT_THEME,
      fontFamily: 'inherit',
      type: 'special',
    });
  });

  it('shallow merges theme object properties', () => {
    expect(
      mergeTheme(DEFAULT_THEME, {
        primitiveColors: { stone: ['#ccc', '#ddd', '#eee'], red: 'red' },
        spacing: { xl: 900 },
      })
    ).toEqual({
      ...DEFAULT_THEME,
      primitiveColors: {
        ...DEFAULT_THEME.primitiveColors,
        stone: ['#ccc', '#ddd', '#eee'],
        red: 'red',
      },
      spacing: {
        ...DEFAULT_THEME.spacing,
        xl: 900,
      },
    });
  });

  it('merges headings correctly', () => {
    expect(
      mergeTheme(DEFAULT_THEME, {
        headings: {
          fontFamily: 'sans-serif',
          sizes: { h3: { fontSize: 500 } },
        },
      })
    ).toEqual({
      ...DEFAULT_THEME,
      headings: {
        ...DEFAULT_THEME.headings,
        fontFamily: 'sans-serif',
        sizes: {
          ...DEFAULT_THEME.headings.sizes,
          h3: {
            ...DEFAULT_THEME.headings.sizes.h3,
            fontSize: 500,
          },
        },
      },
    });
  });
});
