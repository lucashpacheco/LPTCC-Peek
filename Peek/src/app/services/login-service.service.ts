import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { LoginModel } from '../models/LoginModel';
import { HttpClient } from '@angular/common/http';
import { TokenModel } from '../models/TokenModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseURL = environment["peekApiUrl"];

  constructor( private httpClient: HttpClient) { }

  login(loginData: LoginModel) {
    return this.httpClient.post<any>(`${this.baseURL}/userCommands/login`, loginData)
  }

  refreshToken(token: TokenModel) {
    return this.httpClient.post<any>(`${this.baseURL}/userCommands/refresh`, token)
  }
 
}
