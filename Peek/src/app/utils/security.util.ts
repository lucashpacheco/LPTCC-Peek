import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthUserModel } from '../models/AuthUserModel';


export class Security {
  public static helper = new JwtHelperService();

  public static set(user: AuthUserModel, token: string) {
    const data = JSON.stringify(user);

    localStorage.setItem('peekuser', btoa(data));
    //localStorage.setItem('peekuser', data);

    localStorage.setItem('peektoken', token);
  }

  public static setUser(user: AuthUserModel) {
    const data = JSON.stringify(user);
    localStorage.setItem('peekuser', btoa(data));
  }

  public static setToken(token: string) {
    localStorage.setItem('peektoken', token);
  }

  public static getUser() {
    const data = localStorage.getItem('peekuser');
    if (data) {
      return JSON.parse(atob(data));
    } else {
      return null;
    }
  }

  public static getToken() {
    const data = localStorage.getItem('peektoken');
    if (data) {
      return data;
    } else {
      return null;
    }
  }

  public static hasToken(): boolean {
    if (this.getToken())
      return true;
    else
      return false;
  }

  public static clear() {
    localStorage.removeItem('peekuser');
    localStorage.removeItem('peektoken');
  }

  public static decodeToken(token: string) {
    return this.helper.decodeToken(token);
  }

  public static validDateToken(token: string) {
    return this.helper.getTokenExpirationDate(token);
  }

  public static isValidToken(): boolean {
    var token = this.getToken()
    if (token) {
      const isExpired = this.helper.isTokenExpired(token);
      return !isExpired;
    }
    else
      return false;
  }
}
