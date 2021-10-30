import { SerializedStyles } from '@emotion/react';
import { ThemeInterface } from '../core/entities/ui/ui.types';
import { useTheme } from '../ui/hooks/useTheme';
import { useCss } from './hooks/useCss';
import { fromEntries, mergeClassNames } from './utils';

export function createStyles<Params = any>(
  serializedStyles: (
    theme: ThemeInterface,
    params: Params
  ) => Record<string, SerializedStyles> | Record<string, SerializedStyles>
) {
  const getSerializedStyles =
    typeof serializedStyles === 'function'
      ? serializedStyles
      : () => serializedStyles;

  function useStyles(
    params: Params,
    classNames: Partial<Record<string, string>> | null = null,
    name: string = 'unknown'
  ) {
    const theme = useTheme();
    const { css, cx } = useCss();

    const _serializedStyles = getSerializedStyles(theme, params);

    const classes = fromEntries(
      Object.keys(_serializedStyles).map((key) => [
        key,
        css(_serializedStyles[key]),
      ])
    ) as any as Record<string, string>;

    console.log('useStyles', { css, cx, classes, _serializedStyles, params });

    return {
      classes: mergeClassNames(cx, classes, classNames || {}, name),
      cx,
    };
  }

  return useStyles;
}
