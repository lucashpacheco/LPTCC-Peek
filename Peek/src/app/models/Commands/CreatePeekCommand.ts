export class CreatePeekCommand {
  public id!: string;
  public authorId!: string;
  public message!: string;

  constructor(id: string, authorId: string, message: string) {
    this.id = id;
    this.authorId = authorId;
    this.message = message;
  }

}
