import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:3000'; 

  constructor(private http: HttpClient) { }

  signin(login: Login): Observable<any> {
    console.log('login ', login);
    return this.http.post(`${this.apiUrl}/signin`, login);
  }

  validateToken(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/validateToken`, token);
  }
}
