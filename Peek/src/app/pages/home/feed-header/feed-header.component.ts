import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { Security } from '../../../utils/security.util';

@Component({
  selector: 'app-feed-header',
  templateUrl: './feed-header.component.html',
  styleUrls: ['./feed-header.component.css']
})
export class FeedHeaderComponent implements OnInit {

  public user: any;
  public randomDate: any;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
    this.setRandomDate();
  }

  getUser() {
    var token = Security.decodeToken(Security.getToken() as string)
    var user = this.userService.getUser(token.sub)
      .subscribe((data: any) => {

        this.user = data.data as User;
        console.log(this.user);
      })
  }

  setRandomDate() {
    const maxDate = Date.now();
    const timestamp = Math.floor(Math.random() * maxDate);
    this.randomDate = new Date(timestamp).toDateString();
  }
}
