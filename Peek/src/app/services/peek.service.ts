import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreatePeekCommand } from '../models/Commands/CreatePeekCommand';
import { GetPeekRequest } from '../models/Consults/GetPeeksRequest';

@Injectable({
  providedIn: 'root'
})
export class PeekService {

  private readonly baseURL = environment["peekApiUrl"];

  constructor(private httpClient: HttpClient) { }

  public getPeeks(userId: string, page: number, pageSize: number) {
    var filters = new GetPeekRequest("", page, pageSize);
    var response = this.httpClient.post(`${this.baseURL}/peekReader/peeks`, filters )
    return response
  }

  public sendPeeks(createPeekCommand: CreatePeekCommand) {
    var result = this.httpClient.post<any>(`${this.baseURL}/peekWriter/peek`, createPeekCommand)

    return result
  }

}
