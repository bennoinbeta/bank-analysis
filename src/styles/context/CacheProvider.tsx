import React from 'react';
import createCache, { EmotionCache } from '@emotion/cache';

export const { getCache } = (() => {
  let cache: EmotionCache;

  function _getCache() {
    if (cache == null) {
      cache = createCache({ key: 'ui' });
    }
    return cache;
  }

  return { getCache: _getCache };
})();

export const cacheContext = React.createContext<EmotionCache | null>(null);

interface CacheProviderProps {
  value: EmotionCache;
  children: React.ReactNode;
}

export const CacheProvider: React.FC<CacheProviderProps> = (props) => {
  const { children, value } = props;
  return (
    <cacheContext.Provider value={value}>{children}</cacheContext.Provider>
  );
};
