import { Component, OnInit, Output } from '@angular/core';
import { CreateLikeCommand } from '../../../models/Commands/LikeCommand';
import { UnlikeCommand } from '../../../models/Commands/UnlikeCommand';
import { PagedResult } from '../../../models/Common/PagedResult';
import { ResponseBase } from '../../../models/Common/ResponseBase';
import { GetCommentsRequest } from '../../../models/Consults/GetCommentsRequest';
import { Comment } from '../../../models/Domain/Comment';
import { Like } from '../../../models/Domain/Like';
import { Peek } from '../../../models/Domain/Peek';
import { User } from '../../../models/Domain/User';
import { PeekService } from '../../../services/peek.service';
import { UserService } from '../../../services/user.service';
import { Security } from '../../../utils/security.util';

@Component({
  selector: 'app-feed-body',
  templateUrl: './feed-body.component.html',
  styleUrls: ['./feed-body.component.css']
})
export class FeedBodyComponent implements OnInit {

  public worldwidePeeks: any;
  public followedUsers: any;
  private userId: any;

  page = 1;

  public commentsOut: any;
  constructor(private peekService: PeekService, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = Security.decodeToken(Security.getToken() as string).sub;
    this.getWorldwidePeeks();
    this.getFollowedUsers();
    this.peekService.refreshFeed.subscribe(refresh => {
      this.getWorldwidePeeks();
    })
  }

  getWorldwidePeeks() {
    this.peekService.getPeeks(this.userId, 1, 5)
      .subscribe(peeks => {
        var data = peeks as ResponseBase<PagedResult<Peek>>;
        this.worldwidePeeks = data.data.result
      })
  }

  getFollowedUsers() {
    this.userService.getFollowedUsers(this.userId, 1, 100)
      .subscribe(users => {
        var data = users as ResponseBase<PagedResult<User>>;
        this.followedUsers = data.data.result
      })
  }

  onLike(peekId: string) {
    var likeCommand = new CreateLikeCommand(peekId, new Like(this.userId))
    var peek = this.worldwidePeeks.filter((x: any) => x.id == peekId)[0] as Peek;
    peek.liked = true;
    peek.likesCount = ++peek.likesCount;
    this.peekService.likePeek(likeCommand)
      .subscribe(success => {
        this.getWorldwidePeeks();
      })
  }

  onUnlike(peekId: string) {
    var likeCommand = new UnlikeCommand(peekId, this.userId)
    var peek = this.worldwidePeeks.filter((x: any) => x.id == peekId)[0] as Peek;
    peek.liked = false;
    peek.likesCount = peek.likesCount - 1;
    this.peekService.unlikePeek(likeCommand)
      .subscribe(success => {
        this.getWorldwidePeeks();
      })
  }

  onGetComments(peekId: string) {
    var getCommentsRequest = new GetCommentsRequest(peekId, 1, 5);
    this.peekService.getComments(getCommentsRequest)
      .subscribe(data => {
        var peek = this.worldwidePeeks.filter((x: any) => x.id == peekId)[0] as Peek;
        peek.commentsShowed = true;
        peek.comments = data.data.result as Comment[];
      })
  }

  onHideComments(peekId: string) {
    var getCommentsRequest = new GetCommentsRequest(peekId, 1, 5);

    var peek = this.worldwidePeeks.filter((x: any) => x.id == peekId)[0] as Peek;
    peek.commentsShowed = false;
  }

  onScroll(): void {
    this.peekService.getPeeks(this.userId, ++this.page, 5)
      .subscribe(peeks => {
        var data = peeks as ResponseBase<PagedResult<Peek>>;
        this.worldwidePeeks.push(...data.data.result);
      })
  }

}
