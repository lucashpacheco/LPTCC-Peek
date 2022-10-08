import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenModel } from '../../models/TokenModel';
import { LoginService } from '../../services/login-service.service';
import { Security } from '../../utils/security.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.refreshToken()
  }

  refreshToken() {
    if (Security.isValidToken()) {
      this.loginService.refreshToken(new TokenModel(Security.getToken() as string))
        .subscribe(
          token => {
            this.router.navigate(['/home'])

          },
          erro => {
            this.router.navigate(['/login'])
          })
    }
    else {
      this.router.navigate(['/login'])
    }
  }
}
