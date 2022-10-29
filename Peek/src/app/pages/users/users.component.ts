import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UnfollowCommand } from '../../models/Commands/FollowCommand';
import { FollowCommand } from '../../models/Commands/UnfollowCommand';
import { UserService } from '../../services/user.service';
import { Security } from '../../utils/security.util';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public showMenu: boolean = true;

  public usersmodelview: any;
  public users: any;
  public followedUsers: any;

  page = 1;  

  constructor(private fb: FormBuilder, public userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getFollowedUsers();
    this.generateUsersList();
  }
  searchForm: FormGroup = this.fb.group({
    peek: ['', [Validators.required, Validators.minLength(6)]]
  })

  getUsers() {
    this.userService.getUsers(Security.getUserIdbyToken(), this.page, 10)
      .subscribe((data: any) => {
        this.users = data.data.result;
      })
  }

  getFollowedUsers() {
    this.userService.getFollowedUsers(Security.getUserIdbyToken(), 1, 150)
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

    console.log("aqui")
    console.log(test)
  }

  onFollow(followUserId: string) {
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
