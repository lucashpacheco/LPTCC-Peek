import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UnfollowCommand } from '../models/Commands/FollowCommand';
import { FollowCommand } from '../models/Commands/UnfollowCommand';

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

  public getUsers(userId: string, page:number, pageSize:number) {
    var response = this.httpClient.get(`${this.baseURL}/userConsults/users?UsersIds=${userId}&PageInformation.Page=${page}&PageInformation.PageSize=${pageSize}`)
    return response
  }

  public getFollowedUsers(userId: string, page: number, pageSize: number) {
    var response = this.httpClient.get(`${this.baseURL}/userConsults/followedUsers?UserId=${userId}&PageInformation.Page=${page}&PageInformation.PageSize=${pageSize}`)
    return response
  }

  public followUser(followCommand:FollowCommand) {
    var response = this.httpClient.post(`${this.baseURL}/userCommands/follow`, followCommand)
    return response
  }

  public unfollowUser(unfollowCommand: UnfollowCommand) {
    var response = this.httpClient.post(`${this.baseURL}/userCommands/unfollow`, unfollowCommand)
    return response
  }

}
