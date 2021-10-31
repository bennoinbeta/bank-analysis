import React from 'react';
import { cacheContext, getCache } from '../cache';

// Returns an internally managed cache instance
// or the cache instance provided by the 'CacheProvider'
export function useCache() {
  const cache = React.useContext(cacheContext);
  return cache ?? getCache();
}
