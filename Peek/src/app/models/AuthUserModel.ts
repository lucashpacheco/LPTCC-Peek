import { Security } from "../utils/security.util";

export class AuthUserModel {

  public id: string;
  public email: string;
  public tokenExpiration: Date;

  constructor(
    token: string
  ) {
    console.log(Security.decodeToken(token))
    this.id = Security.decodeToken(token).sub;
    this.email = Security.decodeToken(token).email;
    this.tokenExpiration = Security.validDateToken(token) as Date;
  }

}
