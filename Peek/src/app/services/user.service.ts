import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseURL = environment["peekApiUrl"];

  constructor(private httpClient: HttpClient) { }

  public getUser(id: string) { 
    var response = this.httpClient.get(`${this.baseURL}/userConsults/user/${id}`)
      return response
  }

  public getUsers(page:number, pageSize:number) {
    var response = this.httpClient.get(`${this.baseURL}/userConsults/users?PageInformation.Page=${page}&PageInformation.PageSize=${pageSize}`)
    return response
  }

  public getFollowedUsers(userId: string, page: number, pageSize: number) {
    var response = this.httpClient.get(`${this.baseURL}/userConsults/followedUsers?UserId=${userId}&PageInformation.Page=${page}&PageInformation.PageSize=${pageSize}`)
    return response
  }

}
