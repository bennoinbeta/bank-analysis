import { defineConfig } from '@agile-ts/utils';
import { Interpolation, SerializedStyles } from '@emotion/react';
import { ThemeInterface } from '../core/entities/ui/ui.types';
import { useTheme } from '../ui/hooks/useTheme';
import { useCss, CXType } from './hooks/useCss';
import { mergeClassNames } from './utils';

/**
 *
 * @param styles
 */
export function createStyles<
  TParams extends Object = Object,
  TStyles extends StylesData = StylesData
>(styles: StylesType<TParams, TStyles>): UseStylesType<TParams, TStyles> {
  const getStyles = typeof styles === 'function' ? styles : () => styles;

  /**
   * TODO
   *
   * @param params
   * @param config
   */
  return (params, config = {}) => {
    config = defineConfig(config, { name: 'unknown', classNames: {} });

    const theme = useTheme();
    const { css, cx } = useCss();
    const _styles = getStyles(theme, params);

    // Transform specified styles into classes
    const classes: Record<string, string> = {};
    Object.keys(_styles).forEach((key) => {
      classes[key] = css(_styles[key]);
    });

    // Merges the specified classes with the classNames
    // from the config at the corresponding key
    const mergedClasses = mergeClassNames(
      classes,
      config.classNames as any,
      config.name as any,
      cx
    );

    return {
      classes: mergedClasses as any,
      cx,
    };
  };
}

export type StyleItem =
  | SerializedStyles // to do emotion based 'css' styles
  | TemplateStringsArray // to do emotion based 'object' styles
  | Interpolation<any>; // to do emotion based 'object' styles

export type StylesData = Record<string, StyleItem>;

type StylesType<
  TParams extends Object = Object,
  TStyles extends StylesData = StylesData
> = TStyles | ((theme: ThemeInterface, params: TParams) => TStyles);

type UseStylesConfigType = {
  /**
   * Class names to extend the styles specified in 'createStyles()' method.
   * @default {}
   */
  classNames?: Partial<Record<string, string>>;
  /**
   * Key/Name identifier of the created styles.
   * @default 'unknown'
   */
  name?: string;
};

type UseStylesReturnType<TStyles extends Record<string, string>> = {
  cx: CXType;
  classes: TStyles;
};

type UseStylesType<TParams extends Object, TStyles extends StylesData> = (
  params: TParams,
  config: UseStylesConfigType
) => UseStylesReturnType<MapToString<TStyles>>;

type MapToString<T, S extends string = string> = {
  [K in keyof T]: S;
};
