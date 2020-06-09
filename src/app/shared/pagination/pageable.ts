

export interface Pageable<T> {
    content?: T[];
    totalPages?: number;
    totalElements?: number;
    last?: boolean;
    size?: number;
    first?: boolean;
    sort?: {
      sorted?: boolean,
      unsorted?: boolean,
      empty?: boolean
    };
    numberOfElements?: number;
    empty?: boolean;
}
