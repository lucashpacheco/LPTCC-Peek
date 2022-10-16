import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Security } from '../../../utils/security.util';

@Component({
  selector: 'app-user-sugestion',
  templateUrl: './user-sugestion.component.html',
  styleUrls: ['./user-sugestion.component.css']
})
export class UserSugestionComponent implements OnInit {

  public users: any;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(1,10)
      .subscribe((data: any) => {
        this.users = data.data.result;
        
      })
  }
}
