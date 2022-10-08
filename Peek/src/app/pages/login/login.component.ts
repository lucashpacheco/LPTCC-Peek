import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserModel } from '../../models/AuthUserModel';
import { LoginModel } from '../../models/LoginModel';
import { TokenModel } from '../../models/TokenModel';
import { LoginService } from '../../services/login-service.service';
import { Security } from '../../utils/security.util';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = false;

  constructor(
    private fb: FormBuilder,
    public loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.refreshToken();
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })


  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    var loginData = this.loginForm.getRawValue() as LoginModel;
    this.loginService.login(loginData)
      .subscribe(
        token => {
          var user = new AuthUserModel(token.data);
          Security.set(user, token.data);
          this.router.navigate(['/home'])
        },
        erro => {
          Security.clear()
        })
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

  onLogout() {
    Security.clear()
  }
}
