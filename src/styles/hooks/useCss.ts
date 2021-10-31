import { StyleType } from './../create-styles';
import React from 'react';
import clsx from 'clsx';
import { serializeStyles, RegisteredCache } from '@emotion/serialize';
import { insertStyles, getRegisteredStyles } from '@emotion/utils';
import type { EmotionCache } from '@emotion/cache';
import { useCache } from './useCache';

type CSSType = (styles: StyleType[] | StyleType) => string;
export type CXType = (...args: any) => string;

// CssFactory is a simplified version of Emotion's 'ClassNames' class extracted from the React component
// https://emotion.sh/docs/class-names
// https://github.dev/emotion-js/emotion/blob/main/packages/react/src/class-names.js
const { cssFactory } = (() => {
  // Merges the specified 'className' into the cached class names (styles)
  function merge(
    registeredCache: RegisteredCache,
    className: string,
    css: CSSType
  ) {
    // Styles that are already registered in the cache
    const registeredStyles: string[] = [];

    // Extract styles from the cache
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

  function _cssFactory(cache: EmotionCache) {
    // Transfroms the specified styles into one class name and caches them
    const css: CSSType = (...styles) => {
      // Serialize specified styles to one 'SerializedStyle'
      const serialized = serializeStyles(styles as any, cache.registered);

      // Insert serialized style into the specified cache
      insertStyles(cache as any, serialized, false);

      return `${cache.key}-${serialized.name}`;
    };

    // Combines the specified args (class names) with clsx
    // and merges the cached styles with the specified args (class names)
    const cx: CXType = (...args) => merge(cache.registered, clsx(args), css);

    return { css, cx };
  }

  return { cssFactory: _cssFactory };
})();

export function useCss() {
  const cache = useCache();
  return React.useMemo(() => cssFactory(cache), [cache]);
}
