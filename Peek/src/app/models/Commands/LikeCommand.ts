import { Like } from "../Like"

export class CreateLikeCommand {
  public peekId!: string;
  public like!: Like;

  constructor(peekId: string , like: Like) {
    this.peekId = peekId;
    this.like = like;
  }
}
