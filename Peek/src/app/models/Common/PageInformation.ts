export class PageInformation {
  public page!: number;
  public pageSize!: number;

  constructor(page: number, pageSize: number) {
    this.page = page;
    this.pageSize = pageSize;
  }
}
