import { PageInformation } from "../Common/PageInformation";

export class GetCommentsRequest {
  public peekId!: string;
  public pageInformation!: PageInformation

  constructor(peekId: string, page: number, pageSize: number) {

    this.peekId = peekId;
    this.pageInformation = new PageInformation(page, pageSize);
  }

}
