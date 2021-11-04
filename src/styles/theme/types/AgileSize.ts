export type AgileSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type NumberSize = AgileSize | number;
export type Sizes<T> = Record<AgileSize, T>;
