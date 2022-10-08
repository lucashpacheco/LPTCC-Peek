import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {


  public composeHeaders() {
    const token = localStorage.getItem('peektoken');
    const headers = new HttpHeaders().set('Authorization', `bearer ${token}`);
    //todo: tratar este cara
    // const headers = new HttpHeaders().set('Authorization', `bearer ew0KICAiYWxnIjogIkhTMjU2IiwNCiAgInR5cCI6ICJKV1QiDQp9.ew0KICAic3ViIjogImQyYTc4N2Y2LWJlMzctNDkyNy04MzAxLWU5YjFjMmMxMTVjMSIsDQogICJlbWFpbCI6ICJhcHBsZUBwYWNpZW50ZS5jb20iLA0KICAidW5pcXVlX25hbWUiOiAiYXBwbGVAcGFjaWVudGUuY29tIiwNCiAgImp0aSI6ICIwYTU4Y2YwYi0xZGRmLTQwMWYtYWM4Zi1hOTg5NDI3ZGNkOGEiLA0KICAibmJmIjogMTU5NzA4OTAyOSwNCiAgImlhdCI6IDE1OTcwODkwMjksDQogICJyb2xlIjogIlBhY2llbnRlIiwNCiAgImV4cCI6IDE2ODM0ODkwMjksDQogICJpc3MiOiAiR29tZWRNZWQiLA0KICAiYXVkIjogImh0dHBzOi8vbG9jYWxob3N0Ig0KfQ.vZykVk-dvXR4Kq9xf0q2wDd3DRQGQO9BcE0PFisDjgc`)
    return headers
  }
}
