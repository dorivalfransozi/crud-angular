import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router, 
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    let payload = null;
    let isAuthenticated = false;

    try {
      payload = this.localStorageService.get('payload');

      //this.authService.validateToken(payload.token).subscribe

      isAuthenticated = !!payload.token;
    } catch(err) {
      console.log('Nao tem token');
    }

    
    if (isAuthenticated) {
      console.log('authentication OK...');
      //this.router.navigate(['/']); 
      return true;
    } else {
      console.log('authentication failed... redirect to signin');
      this.router.navigate(['/signin']); 
      return false; 
    }
  }
}