import { LocalStorageService } from "./local-storage.service";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const payload = this.localStorageService.get("payload");

    if (!!payload) {
      console.log("interceptor", payload);
      
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${payload.token}`,
          "Content-Type": "application/json",
        },
      });
    }

    return next.handle(request);
  }
}
