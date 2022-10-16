import { Observable, ReplaySubject } from "rxjs";

export class Util {
  constructor() {

  }

  public base64Output: string = "";

  public static getBase64(file:any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}
