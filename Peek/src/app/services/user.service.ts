import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseURL = environment["peekApiUrl"];

  constructor(private httpClient: HttpClient) { }

}
