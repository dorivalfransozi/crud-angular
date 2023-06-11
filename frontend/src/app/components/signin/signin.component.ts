import { MatSnackBar } from '@angular/material/snack-bar';
import { Login } from './../../models/login.model';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/util/auth.service';
import { LocalStorageService } from 'src/app/services/util/local-storage.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  login: Login = { email: '', password: '' };

  constructor(private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private matSnackbar: MatSnackBar) {}

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
        this.matSnackbar.open('Erro ao efetuar o login', 'X', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.login.email = '';
        this.login.password = '';
        console.log('Erro de autenticação:', error);
      }
    );
  }
}
