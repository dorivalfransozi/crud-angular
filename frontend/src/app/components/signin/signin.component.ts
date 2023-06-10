import { Login } from './../../models/login.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/util/auth.service';
import { LocalStorageService } from 'src/app/services/util/local-storage.service';

//import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  login: Login = { email: '', password: '' };

  constructor(private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService) {}

  signin() {
    console.log('signin - begining', this.login);
    
    this.authService.signin(this.login).subscribe(
      (response) => {
        console.log('response = ', response);
        console.log('response.body = ', response.body);
        this.localStorageService.set('payload', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('Erro de autenticação:', error);
      }
    );
  }
}
