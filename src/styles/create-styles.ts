import { SerializedStyles } from '@emotion/react';
import { ThemeInterface } from '../core/entities/ui/ui.types';
import { useTheme } from '../ui/hooks/useTheme';
import { useCss } from './hooks/useCss';
import { mergeClassNames } from './utils';

export type CSSType = SerializedStyles | string;

export function createStyles<Params = any>(
  styles: (
    theme: ThemeInterface,
    params: Params
  ) => Record<string, CSSType> | Record<string, CSSType>
) {
  const getStyles = typeof styles === 'function' ? styles : () => styles;

  function useStyles(
    params: Params,
    classNames: Partial<Record<string, string>> | null = null,
    name: string = 'unknown'
  ) {
    const theme = useTheme();
    const { css, cx } = useCss();
    const _styles = getStyles(theme, params);

    // Transfrom specified styles into classes
    const classes: Record<string, string> = {};
    Object.keys(_styles).forEach((key) => {
      classes[key] = css(_styles[key]);
    });
    const mergedClasses = mergeClassNames(cx, classes, classNames || {}, name);

    return {
      classes: mergedClasses,
      cx,
    };
  }

  return useStyles;
}
