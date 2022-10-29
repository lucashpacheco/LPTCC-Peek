export class Like {
  public userId!: string;
  public createdDate!: Date;

  constructor(userId: string) {
    this.userId = userId;
    this.createdDate = new Date();
  }
}
