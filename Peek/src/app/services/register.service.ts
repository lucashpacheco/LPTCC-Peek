import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegisterModel } from '../models/RegisterModel';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly baseURL = environment["peekApiUrl"];
  public showMenu = new EventEmitter<boolean>();

  constructor(private httpClient: HttpClient) { }

  registerUser(registerData: RegisterModel) {
    console.log("service reg")
    console.log(registerData)
    var result = this.httpClient.post<any>(`${this.baseURL}/userCommands/user`, registerData)
    result.subscribe(success => {
      this.showMenu.emit(success.success)
    })
    return result
  }
}
