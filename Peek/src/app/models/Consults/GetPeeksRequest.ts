import { PageInformation } from "../Common/PageInformation";

export class GetPeekRequest {
  public userId!: string[];
  public pageInformation!: PageInformation

  constructor(userId: string, page: number, pageSize: number) {
    if (userId.length >= 1) {
      this.userId = [];
      this.userId.push(userId);
    }
    else
      this.userId = [];
    this.pageInformation = new PageInformation(page, pageSize);
  }

}
