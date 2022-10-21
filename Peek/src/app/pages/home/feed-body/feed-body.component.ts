import { Component, OnInit } from '@angular/core';
import { CreateLikeCommand } from '../../../models/Commands/LikeCommand';
import { UnlikeCommand } from '../../../models/Commands/UnlikeCommand';
import { Like } from '../../../models/Like';
import { PagedResult } from '../../../models/PagedResult';
import { Peek } from '../../../models/Peek';
import { ResponseBase } from '../../../models/ResponseBase';
import { User } from '../../../models/User';
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

  constructor(private peekService: PeekService, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = Security.decodeToken(Security.getToken() as string).sub;
    this.getWorldwidePeeks();
    this.getFollowedUsers();

  }

  getWorldwidePeeks() {

    this.peekService.getPeeks(this.userId, 1, 10)
      .subscribe(peeks => {
        var data = peeks as ResponseBase<PagedResult<Peek>>;
        this.worldwidePeeks = data.data.result
        console.log(this.worldwidePeeks)
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
    this.peekService.likePeek(likeCommand)
      .subscribe(success => {
        this.getWorldwidePeeks();
      })
  }

  onUnlike(peekId: string) {
    var likeCommand = new UnlikeCommand(peekId, this.userId)
    this.peekService.unlikePeek(likeCommand)
      .subscribe(success => {
        this.getWorldwidePeeks();
      })
  }

}
