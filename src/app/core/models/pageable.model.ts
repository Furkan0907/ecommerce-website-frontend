
export interface Pageable<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElement: number;
}

export interface PageableRequest {
  pageNumber: number;
  pageSize: number;
  columnName?: string;
  asc?: boolean;
}
