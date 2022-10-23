import { Component, OnInit } from '@angular/core';
import { UnfollowCommand } from '../../../models/Commands/FollowCommand';
import { FollowCommand } from '../../../models/Commands/UnfollowCommand';
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
    this.userService.getUsers(Security.getUserIdbyToken() , 1,6)
      .subscribe((data: any) => {
        this.users = data.data.result;
      })
  }

  getFollowedUsers() {
    this.userService.getFollowedUsers(Security.getUserIdbyToken(), 1, 10)
      .subscribe((data: any) => {
        this.followedUsers = data.data.result;
      })
  }

  generateUsersList() {
    this.getUsers();
    this.getFollowedUsers();

    var test = this.followedUsers.map((x:any) => {
      x.Id
    })

    console.log("aqui")
    console.log(test)
  }

  onFollow(followUserId:string) {
    this.userService.followUser(new FollowCommand(Security.getUserIdbyToken(), followUserId))
      .subscribe((data: any) => {
        this.followedUsers = data.data.result;
        this.getUsers();
      })
  }

  onUnfollow(followUserId: string) {
    this.userService.unfollowUser(new UnfollowCommand(Security.getUserIdbyToken(), followUserId))
      .subscribe((data: any) => {
        this.followedUsers = data.data.result;
        this.getUsers();
      })
  }
}
