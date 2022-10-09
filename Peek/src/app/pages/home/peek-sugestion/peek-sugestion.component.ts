import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peek-sugestion',
  templateUrl: './peek-sugestion.component.html',
  styleUrls: ['./peek-sugestion.component.css']
})
export class PeekSugestionComponent implements OnInit {

  public peeksSugestion: any

  constructor() { }

  ngOnInit(): void {
    this.peeksSugestion = [
      {
        authorName: "Julio Matino",
        peekId: "adçlkasdlçkaslçdkças",
        message: "Qualque coisa que sirva para encher linguiça e testar a feat"
      },
      {
        authorName: "Tatiane Bergstun",
        peekId: "adçlkasdlçkaslçdkças",
        message: "Outra coisa que sirva para encher linguiça e testar a feat e tudo mais"
      }    ]
  }

}
