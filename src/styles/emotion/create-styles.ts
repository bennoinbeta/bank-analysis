import { defineConfig } from '@agile-ts/utils';
import { Interpolation, SerializedStyles } from '@emotion/react';
import { ThemeInterface } from '../../core/entities/ui/ui.types';
import { useTheme } from '../../ui/hooks/useTheme';
import { useCss, CXType } from './hooks/useCss';
import { MapToX } from '../types';
import { stylePrefix } from '../config';

/**
 * Helper method to merge the specified classes
 * with the provided styles at the corresponding key.
 *
 * @param classes - Classes key map to merge the specified 'classNames' in.
 * @param classNames - Class names key map to be merged into the specified classes.
 * @param cx - CX method
 * @param name - Key/Name identifier to be contained in each new merged class name.
 */
function mergeClassNames<T extends Record<string, string>>(
  classes: T,
  classNames: Partial<T>,
  cx: CXType,
  name?: string
): T {
  const mergedClasses: Record<string, string> = {};

  for (const classKey of Object.keys(classes)) {
    const toMergeClassName = classNames[classKey];
    mergedClasses[classKey] = cx(
      classes[classKey],
      toMergeClassName || null,
      // To have a readable 'static selector' for styling with e.g. scss.
      // This class name has initially no styling applied.
      // e.g. 'prefix-text-root' or 'prefix-button-container'
      name ? `${stylePrefix}-${name}-${classKey}` : null
    );
  }

  return mergedClasses as any;
}

// Double method due to partial type inference
// https://stackoverflow.com/questions/63678306/typescript-partial-type-inference
export const createStyles =
  <TParams extends Object = Object>() =>
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
  <TStyles extends StylesData = StylesData>(
    styles: StylesType<TParams, TStyles>
  ): UseStylesType<TParams, TStyles> => {
    const getStyles = typeof styles === 'function' ? styles : () => styles;

    /**
     * Hook for accessing the generated class names
     * based on the styles created in 'createStyles()'.
     *
     * @param params - Parameters to be passed to the style creation ('createStyles()') method.
     * @param config - Configuration object
     */
    return (params, config = {}) => {
      config = defineConfig(config, { name: null, styles: {} });

      const theme = useTheme();
      const { css, cx } = useCss();
      const _styles = getStyles(theme, params as any);
      const _extendedStyles = (
        typeof config.styles === 'function'
          ? config.styles(theme)
          : config.styles
      ) as Partial<TStyles>;

      // Transform specified 'styles' into classes
      const classes: Record<string, string> = {};
      Object.keys(_styles).forEach((key) => {
        classes[key] =
          typeof _styles[key] !== 'string'
            ? css(_styles[key])
            : (_styles[key] as any);
      });

      // Transform specified 'extendedStyles' into classes
      const extendedClasses: Record<string, string> = {};
      Object.keys(_extendedStyles).forEach((key) => {
        extendedClasses[key] =
          typeof _extendedStyles[key] !== 'string'
            ? css(_extendedStyles[key])
            : (_extendedStyles[key] as any);
      });

      return {
        classes: mergeClassNames<MapToX<TStyles, string>>(
          classes as any,
          extendedClasses as any,
          cx,
          config.name
        ),
        cx,
      };
    };
  };

export type StyleItem =
  | SerializedStyles // to do emotion based 'css' styles
  | TemplateStringsArray // to do class name based styles
  | Interpolation<any>; // to do emotion based 'object' styles

export type StylesData = Record<string, StyleItem>;

type StylesType<TParams extends Object, TStyles extends StylesData> =
  | TStyles
  | ((theme: ThemeInterface, params: TParams) => TStyles);

export type ExtendedStylesType<TStyles extends StylesData> = Partial<MapToX<TStyles, StyleItem>>
  | ((theme: ThemeInterface) => Partial<MapToX<TStyles, StyleItem>>);

type UseStylesConfigType<TStyles extends StylesData> = {
  /**
   * Styles keymap to extend the styles specified in the 'createStyles()' method.
   * @default {}
   */
  styles?: ExtendedStylesType<TStyles>
  /**
   * Key/Name identifier of the created styles.
   * @default 'unknown'
   */
  name?: string;
};

type UseStylesReturnType<TStyles extends StylesData> = {
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
  classes: MapToX<TStyles, string>;
};

export type UseStylesType<
  TParams extends Object,
  TStyles extends StylesData,
  TConfig extends UseStylesConfigType<TStyles> = UseStylesConfigType<TStyles>
> = (params?: TParams, config?: TConfig) => UseStylesReturnType<TStyles>;

export type ExtractStylesType<T> = T extends UseStylesType<infer P, infer S, infer C>
  ? C['styles']
  : never;
