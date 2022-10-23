export class Comment {
  public id!: string;
  public authorId!: string;
  public message!: string;
  public createdDate!: Date;

  constructor(id: string, authorId: string, message: string) {
    this.id = id;
    this.authorId = authorId;
    this.message = message;
    this.createdDate = new Date();
  }
}

