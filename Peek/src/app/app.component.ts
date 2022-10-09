import { Component } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LoginService } from './services/login-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Peek';

  public showMenu: boolean = false;

  constructor(
    public loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loginService.showMenu.subscribe(show => {

      this.showMenu = show;
    }
      );
  }
}

