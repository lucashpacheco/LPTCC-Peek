import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegisterCommand } from '../models/Commands/RegisterCommand';
import { Security } from '../utils/security.util';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly baseURL = environment["peekApiUrl"];
  public showMenu = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient) { }

  registerUser(registerData: RegisterCommand) {
    console.log("service reg")
    console.log(registerData)
    var result = this.httpClient.post<any>(`${this.baseURL}/userCommands/user`, registerData);
    this.refreshToken();
    return result;
  }

  refreshToken() {
    var result = this.httpClient.post<any>(`${this.baseURL}/userCommands/refresh`, Security.getToken())
    result.subscribe(success => {
      this.showMenu.emit(success.success)
    })
    return result
  }
}
