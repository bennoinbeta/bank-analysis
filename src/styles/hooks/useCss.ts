import React from 'react';
import clsx from 'clsx';
import { serializeStyles, RegisteredCache } from '@emotion/serialize';
import { insertStyles, getRegisteredStyles } from '@emotion/utils';
import type { EmotionCache } from '@emotion/cache';
import { useCache } from './useCache';
import { SerializedStyles } from '@emotion/react';

type CSSType = (
  styles: (string | SerializedStyles)[] | string | SerializedStyles
) => string;

export type CXType = (...args: any) => string;

// CssFactory is a simplified version of Emotion's the 'ClassNames' class
// extracted from the React component
// https://emotion.sh/docs/class-names
// https://github.dev/emotion-js/emotion/blob/main/packages/react/src/class-names.js
const { cssFactory } = (() => {
  // Merge specified 'className' into the cached class names
  function merge(
    registeredCache: RegisteredCache,
    css: CSSType,
    className: string
  ) {
    const registeredStyles: string[] = [];

    // Extract styles from cache
    const rawClassName = getRegisteredStyles(
      registeredCache,
      registeredStyles, // call by reference
      className
    );

    if (registeredStyles.length < 2) {
      return className;
    }
    return rawClassName + css(registeredStyles);
  }

  function _cssFactory(params: { cache: EmotionCache }) {
    const { cache } = params;

    const css: CSSType = (...styles) => {
      // Serialize specified styles to one 'SerializedStyle'
      const serialized = serializeStyles(styles, cache.registered);

      // Insert serialized style into the specified cache
      insertStyles(cache as any, serialized, false);

      return `${cache.key}-${serialized.name}`;
    };

    // Merges the cached class names with the specified args (class names)
    const cx: CXType = (...args) => merge(cache.registered, css, clsx(args));

    return { css, cx };
  }

  return { cssFactory: _cssFactory };
})();

export function useCss() {
  const cache = useCache();
  return React.useMemo(() => cssFactory({ cache }), [cache]);
}
