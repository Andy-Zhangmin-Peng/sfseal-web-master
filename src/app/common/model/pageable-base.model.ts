export class PageableBase<T> {
  pageNum: number;
  pageSize: number;
  reasonable: boolean;
  pageSizeZero: boolean;
  countColumn: string;
  orderBy: string;
  orderByOnly: boolean;
  condition: T;
}
