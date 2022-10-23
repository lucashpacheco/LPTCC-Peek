import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'js-guid';
import { CreateCommentCommand } from '../../../../models/Commands/CreateCommentCommand';
import { PeekService } from '../../../../services/peek.service';
import { UserService } from '../../../../services/user.service';
import { Security } from '../../../../utils/security.util';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})
export class CommentModalComponent implements OnInit {
  @Input() data: any;
  @Input() peekId: any;
  private userId: any;

  constructor(private fb: FormBuilder, public userService: UserService, public peekService: PeekService) { }

  ngOnInit(): void {
    this.userId = Security.decodeToken(Security.getToken() as string).sub;

  }

  commentForm: FormGroup = this.fb.group({
    comment: ['', [Validators.required, Validators.minLength(1)]]
  })

  sendComment(peekId: string) {
    debugger
    if (!this.commentForm.valid) {
      return;
    }
    var commentData = this.commentForm.getRawValue().comment as string;
    var createCommand = new CreateCommentCommand(peekId, Guid.newGuid().toString(), this.userId, commentData);
    this.peekService.sendComment(createCommand)
      .pipe()
      .toPromise()
      .then(x => {

        this.commentForm.reset();

      })
  }
}
