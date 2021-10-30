import { copy } from '@agile-ts/utils';
import clsx from 'clsx';
import { css, SerializedStyles } from '@emotion/react';
import { serializeStyles, RegisteredCache } from '@emotion/serialize';
import { insertStyles, getRegisteredStyles } from '@emotion/utils';
import createCache, { EmotionCache } from '@emotion/cache';

import React from 'react';
import { ThemeInterface } from '../../../../../core/entities/ui/ui.types';
import { useTheme } from '../../../../hooks/useTheme';

const { cssFactory } = (() => {
  // See 'https://github.dev/emotion-js/emotion/blob/main/packages/react/src/class-names.js'
  function merge(
    registered: RegisteredCache,
    css: (...args: Array<any>) => string,
    className: string
  ) {
    const registeredStyles: string[] = [];

    const rawClassName = getRegisteredStyles(
      registered,
      registeredStyles,
      className
    );

    if (registeredStyles.length < 2) {
      return className;
    }
    return rawClassName + css(registeredStyles);
  }

  function _cssFactory(params: { cache: EmotionCache }) {
    const { cache } = params;

    const css: any = (...styles: any) => {
      const serialized = serializeStyles(styles, cache.registered);
      insertStyles(cache as any, serialized, false);
      return `${cache.key}-${serialized.name}`;
    };

    const cx = (...args: any) => merge(cache.registered, css, clsx(args));

    return { css, cx };
  }

  return { cssFactory: _cssFactory };
})();

const context = React.createContext<EmotionCache | null>(null);

const { getCache } = (() => {
  let cache: EmotionCache;

  function _getCache() {
    if (cache === undefined) {
      cache = createCache({ key: 'ui' });
    }

    return cache;
  }

  return { getCache: _getCache };
})();

export function useCache() {
  const hasCache = React.useContext(context);
  return hasCache || getCache();
}

function useCss() {
  const cache = useCache();
  return React.useMemo(() => cssFactory({ cache }), [cache]);
}

function mergeClassNames<T extends Record<string, string>>(
  cx: (..._classNames: any) => string,
  classes: T,
  classNames: Partial<T>,
  name: string
) {
  return Object.keys(classes).reduce((acc: any, className: string) => {
    acc[className] = cx(
      classes[className],
      classNames != null && classNames[className],
      name ? `ui-${name}-${className}` : null
    );
    return acc;
  }, {}) as T;
}

function createStyles<Params = void>(
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

    const classes = copy(
      Object.keys(_serializedStyles).map((key) => [
        key,
        css(_serializedStyles[key]),
      ])
    ) as any as Record<string, string>;

    return {
      classes: mergeClassNames(cx, classes, classNames || {}, name),
      cx,
    };
  }

  return useStyles;
}

export default createStyles<any>((theme, { color, variant, size, inherit }) => {
  return {
    root: css`
      color: ${color != null ? color : theme.colors.on_background};
      font-family: ${inherit ? 'inherit' : 'roboto'};
      font-size: ${inherit ? 'inherit' : size};
      line-height: ${inherit ? 'inherit' : size * 1.2};
      text-decoration: none;

      -webkit-tap-highlight-color: transparent;

      :hover {
        text-decoration: ${variant === 'link' ? 'underline' : 'none'};
      }
    `,

    gradient: css``,
  };
});
