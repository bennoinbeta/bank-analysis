import CacheProvider from './CacheProvider';
import createCache, { EmotionCache, Options } from '@emotion/cache';

const cacheKey = 'custom-css';

export const { getCache } = (() => {
  let cache: EmotionCache;

  // Creates a new cache if no cache has been created yet
  // TODO find out how to access the default emotion cache
  function _getCache(options?: Options) {
    if (cache == null) {
      cache = createCache(options ?? { key: cacheKey, prepend: true });
    }
    return cache;
  }

  return { getCache: _getCache };
})();

export * from './CacheProvider';
export default CacheProvider;
