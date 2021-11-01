import { defineConfig } from '@agile-ts/utils';
import { Interpolation, SerializedStyles } from '@emotion/react';
import { ThemeInterface } from '../core/entities/ui/ui.types';
import { useTheme } from '../ui/hooks/useTheme';
import { useCss, CXType } from './hooks/useCss';

/**
 * Helper method to merge the specified classes
 * with the provided 'classNames' at the corresponding key.
 *
 * @param classes - Classes key map to merge the specified 'classNames' in.
 * @param classNames - Class names key map to be merged into the specified classes.
 * @param name - Key/Name identifier to be contained in each new merged class name.
 * @param cx - CX method
 */
function mergeClassNames<T extends Record<string, string>>(
  classes: T,
  classNames: Partial<T>,
  name: string,
  cx: CXType
): Record<string, string> {
  const mergedClasses: Record<string, string> = {};

  for (const classKey of Object.keys(classes)) {
    const toMergeClassNAme = classNames[classKey];
    if (toMergeClassNAme != null) {
      mergedClasses[classKey] = cx(
        classes[classKey],
        toMergeClassNAme,
        name ? `merged-${name}-${classKey}` : null
      );
    } else {
      mergedClasses[classKey] = classes[classKey];
    }
  }

  return mergedClasses;
}

/**
 * Transfers the (in object shape or emotion style) specified styles
 * into the returned 'useStyles()' hook.
 *
 * The 'useStyles()' hook should be used in React components
 * where the styles are to be used in.
 * It provides the specified styles mapped to class names
 * and some handy utilities for working with these class names.
 *
 * @param styles - Styles to be passed to the returned 'useStyles()' hook and converted to class names.
 */
export function createStyles<
  TParams extends Object = Object,
  TStyles extends StylesData = StylesData
>(styles: StylesType<TParams, TStyles>): UseStylesType<TParams, TStyles> {
  const getStyles = typeof styles === 'function' ? styles : () => styles;

  /**
   * Hook for accessing the generated class names
   * based on the styles created in 'createStyles()'.
   *
   * @param params - Parameters to be passed to the style creation ('createStyles()') method.
   * @param config - Configuration object
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

    return {
      classes: mergeClassNames(
        classes,
        config.classNames as any,
        config.name as any,
        cx
      ) as any,
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

type UseStylesConfigType<TStyles extends StylesData> = {
  /**
   * Class names keymap to extend the styles specified in the 'createStyles()' method.
   * @default {}
   */
  classNames?: Partial<TStyles>;
  /**
   * Key/Name identifier of the created styles.
   * @default 'unknown'
   */
  name?: string;
};

type UseStylesReturnType<TStyles extends Record<string, string>> = {
  /**
   * Merges the specified class names.
   *
   * It has the same api as the popular [clsx](https://www.npmjs.com/package/clsx) package.
   *
   * The key advantage of `cx` is that it detects emotion generated class names
   * ensuring styles are overwritten in the correct order.
   * Emotion generated styles are applied from left to right.
   * Subsequent styles overwrite property values of previous styles.
   *
   * More: https://emotion.sh/docs/@emotion/css#cx
   *
   * @param args - Arguments to be merged together.
   */
  cx: CXType;
  /**
   * Class names keymap based on the styles key map
   * specified in the 'createStyles()' method.
   */
  classes: TStyles;
};

type UseStylesType<TParams extends Object, TStyles extends StylesData> = (
  params: TParams,
  config: UseStylesConfigType<TStyles>
) => UseStylesReturnType<MapToString<TStyles>>;

type MapToString<T, S extends string = string> = {
  [K in keyof T]: S;
};
