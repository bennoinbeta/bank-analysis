export type MapToX<T, X = any> = {
  [K in keyof T]: X;
};
