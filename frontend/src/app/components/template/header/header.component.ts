import { LocalStorageService } from 'src/app/services/util/local-storage.service';
import { HeaderService } from '../../../services/observables/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginInfoService } from 'src/app/services/observables/login-info.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userName: string = '';

  constructor(private headerService: HeaderService,
    private localStorageService: LocalStorageService,
    private loginInfoService: LoginInfoService,
    private router: Router) {
  }

  ngOnDestroy(): void {
    //this.loginInfoService.getLoginInfo().unsubscribe();
  }

  ngOnInit(): void {
    this.loginInfoService.getLoginInfo().subscribe(loginInfo => {
      this.userName = loginInfo.userName;
    } );
  }

  logoff(): void {
    this.localStorageService.remove('payload');
    this.loginInfoService.setLoginInfo({
      userName: ''
    });
    this.router.navigate(['/signin']);
  }

  get title(): string {
    return this.headerService.headerData.title;
  }

  get icon(): string {
    return this.headerService.headerData.icon;
  }

  get routeUrl(): string {
    return this.headerService.headerData.routeUrl;
  }

}
