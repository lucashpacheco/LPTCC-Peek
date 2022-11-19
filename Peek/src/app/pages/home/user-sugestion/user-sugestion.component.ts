import { Component, OnInit } from '@angular/core';
import { UnfollowCommand } from '../../../models/Commands/FollowCommand';
import { FollowCommand } from '../../../models/Commands/UnfollowCommand';
import { User } from '../../../models/Domain/User';
import { UserService } from '../../../services/user.service';
import { Security } from '../../../utils/security.util';

@Component({
  selector: 'app-user-sugestion',
  templateUrl: './user-sugestion.component.html',
  styleUrls: ['./user-sugestion.component.css']
})
export class UserSugestionComponent implements OnInit {

  public usersmodelview: any;
  public users: any;
  public followedUsers: any;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getFollowedUsers();
    this.generateUsersList();
  }

  getUsers() {
    this.userService.getUsers(Security.getUserIdbyToken(), 1, 6)
      .subscribe((data: any) => {
        this.users = data.data.result;
      })
  }

  getFollowedUsers() {
    this.userService.getFollowedUsers(Security.getUserIdbyToken(), 1, 15)
      .subscribe((data: any) => {
        this.followedUsers = data.data.result;
      })
  }

  generateUsersList() {
    this.getUsers();
    this.getFollowedUsers();

    var test = this.followedUsers.map((x: any) => {
      x.Id
    })
  }

  onFollow(followUserId: string) {
    var user = this.users.filter((x: any) => x.id == followUserId)[0] as User;
    user.followed = true;
    this.userService.followUser(new FollowCommand(Security.getUserIdbyToken(), followUserId))
      .subscribe((data: any) => {
        this.followedUsers = data.data.result;
        this.getUsers();
      })
  }

  onUnfollow(followUserId: string) {
    var user = this.users.filter((x: any) => x.id == followUserId)[0] as User;
    user.followed = false;
    this.userService.unfollowUser(new UnfollowCommand(Security.getUserIdbyToken(), followUserId))
      .subscribe((data: any) => {
        this.followedUsers = data.data.result;
        this.getUsers();
      })
  }
}
