import { ProductDeleteComponent } from './components/product/product-delete/product-delete.component';
import { ProductUpdateComponent } from './components/product/product-update/product-update.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ProductCrudComponent } from './views/product-crud/product-crud.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/util/auth-guard.service';


const routes: Routes = [
  { path: "signin",  component: SigninComponent },
  { path: "signup",  component: SignupComponent },
  { path: "",  component: HomeComponent, canActivate: [AuthGuard] },
  { path: "products",  component: ProductCrudComponent, canActivate: [AuthGuard] },
  { path: "products/create",  component: ProductCreateComponent, canActivate: [AuthGuard] },
  { path: "products/update/:id",  component: ProductUpdateComponent, canActivate: [AuthGuard] },
  { path: "products/delete/:id",  component: ProductDeleteComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
