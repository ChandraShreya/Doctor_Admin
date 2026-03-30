
export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
}

export interface IPaginatedResponse<T> extends IApiResponse<T[]> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncFunction<T = void> = () => Promise<T>;
export type Callback<T = void> = (data: T) => void;
