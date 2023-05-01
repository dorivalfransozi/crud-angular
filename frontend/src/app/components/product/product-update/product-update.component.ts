import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../../../services/product/product.service";
import { Component, OnInit } from "@angular/core";
import { Product } from "../../../models/product.model";

@Component({
  selector: "app-product-update",
  templateUrl: "./product-update.component.html",
  styleUrls: ["./product-update.component.css"],
})
export class ProductUpdateComponent implements OnInit {
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

  updateProduct(): void {
    console.log(this.product);
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage("Produto alterado!");
      this.router.navigate(["/products"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
