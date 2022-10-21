export class UnlikeCommand {
  public peekId: string;
  public userId: string;

  constructor(peekId: string, userId: string) {
    this.peekId = peekId;
    this.userId = userId;
  }
}
