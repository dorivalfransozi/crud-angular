import { LocalStorageService } from 'src/app/services/util/local-storage.service';
import { HeaderService } from './../../../services/template/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  userName: string = '';

  constructor(private headerService: HeaderService,
    private localStorageService: LocalStorageService,
    private router: Router) {
     this.userName = '';
     //this.logoff();
   }

  ngOnInit(): void {
  }

  logoff(): void {
    this.localStorageService.remove('payload');
    this.userName = '';
    this.router.navigate(['/']);
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
