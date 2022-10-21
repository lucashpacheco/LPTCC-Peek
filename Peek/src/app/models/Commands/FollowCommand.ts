export class UnfollowCommand {
  public userId: string;
  public followedUserId: string;

  constructor(userId: string, followedUserId: string) {
    this.userId = userId;
    this.followedUserId = followedUserId;
  }
}
