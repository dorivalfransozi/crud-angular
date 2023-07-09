import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../../models/product.model';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { LocalStorageService } from '../util/local-storage.service';
import { PaginationResult } from 'src/app/models/pagination-result.model';

@Injectable({
  // singleton
  providedIn: 'root'
})
export class ProductService {

  //mongodb+srv://dorivalfransozi:4wk7GPnBQRGU9SId@cluster0.2l9sgg4.mongodb.net/?retryWrites=true&w=majority
  //baseUrl = "mongodb://localhost:27017/?directConnection=true&tls=false"; // "http://127.0.0.1:3001/products";
  //baseUrl = "mongodb+srv://dorivalfransozi:4wk7GPnBQRGU9SId@cluster0.2l9sgg4.mongodb.net/?retryWrites=true&w=majority"
  baseUrl = "http://127.0.0.1:3000/products";

  constructor(
    private snackBar: MatSnackBar,
    private httpClient: HttpClient
    ) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Error - ' + e, true);
    return EMPTY;
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.baseUrl, product).pipe(
       map(obj => obj),
       catchError(e => this.errorHandler(e))
    );
  }

  read(page: number, pageSize: number): Observable<PaginationResult<Product>> {
    const url = `${this.baseUrl}?page=${page}&pageSize=${pageSize}`;

    return this.httpClient.get<PaginationResult<Product>>(url).pipe(
      map(obj => obj),
      catchError(e => {
        console.log(e);
        return this.errorHandler(e);
      })
    );
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  } 

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.httpClient.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  } 




}
