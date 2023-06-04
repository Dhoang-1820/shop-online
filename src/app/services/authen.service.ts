import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  fakeUsername: string = "hoang";
  fakePassword: string = "123123";

  constructor() { }

  login(userInfo: any): void {
    sessionStorage.setItem("user-info", JSON.stringify(userInfo));
  }

  logout(): void {
    sessionStorage.removeItem("user-info");
  }

  isUserLoggedIn(): boolean {
    if (sessionStorage.getItem("user-info") != null) {
      return true;
    }
    return false;
  }

  getUserLoggedIn(): any {
    let user = sessionStorage.getItem("user-info")
    if (user != null) {
      return JSON.parse(user);
    }
    return null;
  }
}
