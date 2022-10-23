import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreatePeekCommand } from '../models/Commands/CreatePeekCommand';
import { CreateLikeCommand } from '../models/Commands/LikeCommand';
import { UnlikeCommand } from '../models/Commands/UnlikeCommand';
import { GetCommentsRequest } from '../models/Consults/GetCommentsRequest';
import { GetPeekRequest } from '../models/Consults/GetPeeksRequest';

@Injectable({
  providedIn: 'root'
})
export class PeekService {

  private readonly baseURL = environment["peekApiUrl"];

  constructor(private httpClient: HttpClient) { }

  public getPeeks(userId: string, page: number, pageSize: number) {
    var filters = new GetPeekRequest(userId, page, pageSize);
    var response = this.httpClient.post(`${this.baseURL}/peekReader/peeks`, filters )
    return response
  }

  public sendPeeks(createPeekCommand: CreatePeekCommand) {
    var result = this.httpClient.post<any>(`${this.baseURL}/peekWriter/peek`, createPeekCommand)

    return result
  }

  public likePeek(likeCommand: CreateLikeCommand) {
    var result = this.httpClient.post<any>(`${this.baseURL}/peekWriter/like`, likeCommand)

    return result
  }

  public unlikePeek(unlikeCommand: UnlikeCommand) {
    var result = this.httpClient.delete<any>(`${this.baseURL}/peekWriter/like?PeekId=${unlikeCommand.peekId}&UserId=${unlikeCommand.userId}`)

    return result
  }

  public getComments(getComments: GetCommentsRequest) {
    var result = this.httpClient.get<any>(`${this.baseURL}/peekReader/comments?PeekId=${getComments.peekId}&PageInformation.Page=${getComments.pageInformation.page}&PageInformation.PageSize=${getComments.pageInformation.pageSize}`)

    return result
  }

}
