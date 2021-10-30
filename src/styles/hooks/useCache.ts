import React from 'react';
import { cacheContext, getCache } from '../context/CacheProvider';

export function useCache() {
  const cache = React.useContext(cacheContext);
  return cache ?? getCache();
}
