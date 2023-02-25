export type Tparams = string | number;

export type TOmitId<T> = Omit<T, "id">;

export type TOmitPassword<T> = Omit<T, "password">;
