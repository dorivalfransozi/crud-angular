import { Component } from '@angular/core';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  login: Login = { email: '', password: '' };

  signup() {}

}
