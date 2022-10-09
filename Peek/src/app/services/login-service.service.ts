import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { LoginModel } from '../models/LoginModel';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../models/TokenModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseURL = environment["peekApiUrl"];
  public showMenu = new EventEmitter<boolean>();

  constructor( private httpClient: HttpClient) { }

  login(loginData: LoginModel) {

    var result = this.httpClient.post<any>(`${this.baseURL}/userCommands/login`, loginData)
    result.subscribe(success => {
      this.showMenu.emit(success.success)
    })
    return result
  }

  refreshToken(token: TokenModel) {
    var result = this.httpClient.post<any>(`${this.baseURL}/userCommands/refresh`, token)
    result.subscribe(success => {
      this.showMenu.emit(success.success)
    })
    return result
  }
 
}
