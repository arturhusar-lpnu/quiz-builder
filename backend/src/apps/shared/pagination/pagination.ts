export interface PaginationMeta {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface PaginationResponse<T> {
  items: T[];
  meta: PaginationMeta;
}
