export type AgileSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AgileNumberSize = AgileSize | number;
export type AgileSizes<T> = Record<AgileSize, T>;
