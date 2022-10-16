import { Component, OnInit } from '@angular/core';
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

  constructor(private peekService: PeekService, private userService: UserService) { }

  ngOnInit(): void {
    this.getWorldwidePeeks();
    this.getFollowedUsers();
  }

  getWorldwidePeeks() {
    var userId = Security.decodeToken(Security.getToken() as string).sub
    this.peekService.getPeeks(userId, 1, 10)
      .subscribe(peeks => {
        var data = peeks as ResponseBase<PagedResult<Peek>>;
        this.worldwidePeeks = data.data.result
        console.log(this.worldwidePeeks)
      })
  }

  getFollowedUsers() {
    var userId = Security.decodeToken(Security.getToken() as string).sub
    this.userService.getFollowedUsers(userId, 1, 100)
      .subscribe(users => {
        var data = users as ResponseBase<PagedResult<User>>;
        this.followedUsers = data.data.result
      })
  }

}
