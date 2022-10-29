import { Comment } from "../Domain/Comment"

export class CreateCommentCommand {
  public peekId!: string;
  public comment!: Comment;

  constructor(peekId: string, id: string, authorId: string, message: string) {
    this.peekId = peekId;
    this.comment = new Comment(id, authorId, message);

  }

}
