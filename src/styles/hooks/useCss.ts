import React from 'react';
import clsx from 'clsx';
import { serializeStyles, RegisteredCache } from '@emotion/serialize';
import { insertStyles, getRegisteredStyles } from '@emotion/utils';
import type { EmotionCache } from '@emotion/cache';
import { useCache } from './useCache';

// CssFactory is a simplified version of Emotion's the 'ClassNames' class
// extracted from the React component
// https://emotion.sh/docs/class-names
// 'https://github.dev/emotion-js/emotion/blob/main/packages/react/src/class-names.js'
const { cssFactory } = (() => {
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

export function useCss() {
  const cache = useCache();
  return React.useMemo(() => cssFactory({ cache }), [cache]);
}
