export type MapToX<T, X = any> = {
  [K in keyof T]: X;
};

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
