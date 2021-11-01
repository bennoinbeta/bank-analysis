import CacheProvider from './CacheProvider';
import createCache, { EmotionCache, Options } from '@emotion/cache';

export const { getCache } = (() => {
  let cache: EmotionCache;
  const cacheKey = 'custom-css';

  /**
   * Returns the existing cache or creates a new one
   * and returns the newly created cache
   * if no cache has been created yet.
   *
   * @param config - Configuration object
   */
  function _getCache(config?: Options) {
    if (cache == null) {
      cache = createCache(config ?? { key: cacheKey, prepend: true });
    }
    return cache;
  }

  return { getCache: _getCache };
})();

export * from './CacheProvider';
export default CacheProvider;
