import { defineConfig } from '@agile-ts/utils';
import { Interpolation, SerializedStyles } from '@emotion/react';
import { ThemeInterface } from '../core/entities/ui/ui.types';
import { useTheme } from '../ui/hooks/useTheme';
import { useCss, CXType } from './hooks/useCss';
import { mergeClassNames } from './utils';

export type StyleType =
  | SerializedStyles
  | TemplateStringsArray
  | Interpolation<any>;

type StylesType<Params extends Object = Object> = (
  theme: ThemeInterface,
  params: Params
) => Record<string, StyleType> | Record<string, StyleType>;
type UseStylesConfig = {
  classNames?: Partial<Record<string, string>>;
  name?: string;
};

export function createStyles<Params extends Object = Object>(
  styles: StylesType<Params>
) {
  const getStyles = typeof styles === 'function' ? styles : () => styles;

  function useStyles(
    params: Params,
    config: UseStylesConfig = {}
    // TODO make this more type safe
  ): { cx: CXType; classes: Record<string, string> } {
    config = defineConfig(config, { name: 'unknown', classNames: {} });
    const theme = useTheme();
    const { css, cx } = useCss();
    const _styles = getStyles(theme, params);

    // Transfrom specified styles into classes
    const classes: Record<string, string> = {};
    Object.keys(_styles).forEach((key) => {
      classes[key] = css(_styles[key]);
    });

    // Merges the specified classes with the classNames from the config
    const mergedClasses = mergeClassNames(
      cx,
      classes,
      config.classNames as any,
      config.name as any
    );

    return {
      classes: mergedClasses,
      cx,
    };
  }

  return useStyles;
}
