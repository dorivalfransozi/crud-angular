import { Component, OnInit } from "@angular/core";
import { Product } from "../../../models/product.model";
import { ProductService } from "../../../services/product/product.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent implements OnInit {
  product: Product = {
    name: "",
  };
  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    this.productService
      .readById(id ? id : "")
      .subscribe((product) => (this.product = product));
  }

  deleteProduct(): void {
    this.productService.delete(this.product.id ? this.product.id : 0).subscribe(() => {
      this.productService.showMessage("Produto excluído!");
      this.router.navigate(["/products"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
