import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginInfo } from 'src/app/models/login-info.model';

@Injectable({
  providedIn: 'root'
})
export class LoginInfoService {

  loginInfo: Subject<LoginInfo> = new Subject();

  constructor() {
    this.loginInfo.next({
      userName: ''
    });
  }

  getLoginInfo(): Observable<LoginInfo> {
    return this.loginInfo.asObservable();
  }

  setLoginInfo(loginInfo: LoginInfo) {
    this.loginInfo.next(loginInfo);
  }

}
