import CacheProvider from './CacheProvider';
import createCache, { EmotionCache } from '@emotion/cache';

const cacheKey = 'custom-css';

export const { getCache } = (() => {
  let cache: EmotionCache;

  // Creates a new cache if no cache has been created yet
  // TODO find out how to access the default emotion cache
  function _getCache(useDefault = false) {
    if (cache == null) {
      cache = createCache({ key: cacheKey });
    }
    return cache;
  }

  return { getCache: _getCache };
})();

export * from './CacheProvider';
export default CacheProvider;
