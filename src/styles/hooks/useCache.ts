import React from 'react';
import { cacheContext, getCache } from '../cache';

// Returns a internally managed cache
// or the cache provded by the 'CacheProvider'
export function useCache() {
  const cache = React.useContext(cacheContext);
  return cache ?? getCache();
}
