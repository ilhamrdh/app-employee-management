export type Paging = {
  size: number;
  total_page: number;
  current_page: number;
};

export type Pageable<T> = {
  additional_info?: any;
  data: Array<T>;
  paging: Paging;
};
