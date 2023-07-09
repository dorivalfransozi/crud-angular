import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';

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

  //@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  displayedColumns = ['id', 'name', 'price', 'action'];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
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
