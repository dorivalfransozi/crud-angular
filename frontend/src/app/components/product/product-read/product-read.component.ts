import { PageEvent } from '@angular/material/paginator';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, filter, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[] = [];

  currentPage = 0;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;

  formSearchProduct: FormGroup;

  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(private productService: ProductService) {
    this.formSearchProduct = new FormGroup({
      filterProduct: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.getProducts();

    this.formSearchProduct.controls['filterProduct'].valueChanges.pipe(
      debounceTime(500),
      filter(filter => filter != ''),
      distinctUntilChanged(),
      switchMap((filter: string | null) => {
        const filterTraited = filter ? filter : '';
        return this.productService.readByName(filterTraited).pipe(
          catchError(err => {
            console.log(`erro ocorrido ${err}`);
            return of([]);
          })
        )
      })
    ).subscribe(products => {
      console.log('produts => ', products);
      this.products = products;
    });
  }

  cleanInput() {
    this.formSearchProduct.controls['filterProduct'].setValue('');
    this.getProducts();
  }

  getProducts(): void {  
    this.productService.read(this.currentPage, this.pageSize).subscribe(products => {
      this.products = products.data;
      this.totalItems = products.totalItems;
      this.totalPages = products.totalPages;
      console.log(this.products)
    });
  }

  refreshPage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    
    console.log(event);
    this.getProducts();
  }

}
