import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-modal',
  templateUrl: './comment-modal.component.html',
  styleUrls: ['./comment-modal.component.css']
})
export class CommentModalComponent implements OnInit {
  @Input() data: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
