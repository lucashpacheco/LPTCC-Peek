import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatePeekCommand } from '../../../models/Commands/CreatePeekCommand';
import { User } from '../../../models/User';
import { PeekService } from '../../../services/peek.service';
import { UserService } from '../../../services/user.service';
import { Security } from '../../../utils/security.util';
import { Guid } from 'js-guid';

@Component({
  selector: 'app-feed-header',
  templateUrl: './feed-header.component.html',
  styleUrls: ['./feed-header.component.css']
})
export class FeedHeaderComponent implements OnInit {

  public user: any;
  public randomDate: any;

  constructor(private fb: FormBuilder, public userService: UserService, public peekService: PeekService) { }

  ngOnInit(): void {
    this.getUser();
    this.setRandomDate();
  }

  peekForm: FormGroup = this.fb.group({
    peek: ['', [Validators.required, Validators.minLength(6)]]
  })

  getUser() {
    var token = Security.decodeToken(Security.getToken() as string)
    var user = this.userService.getUser(token.sub)
      .subscribe((data: any) => {

        this.user = data.data as User;
      })
  }

  setRandomDate() {
    const maxDate = Date.now();
    const timestamp = Math.floor(Math.random() * maxDate);
    this.randomDate = new Date(timestamp).toDateString();
  }

  sendPeek() {
    if (!this.peekForm.valid) {
      return;
    }
    var peekData = this.peekForm.getRawValue().peek as string;
    var createCommand = new CreatePeekCommand(Guid.newGuid().toString(), this.user.id, peekData);
    this.peekService.sendPeeks(createCommand)
      .pipe()
      .toPromise()
      .then(x => {

        this.peekForm.reset();

      })
  }
}
