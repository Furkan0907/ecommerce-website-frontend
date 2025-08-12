import { ProfileComponent } from './pages/profile/profile.component';
import { NgModule } from "@angular/core";
import { HomeComponent } from "./pages/home/home.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CustomerLayoutComponent } from "./pages/customer-layout/customer-layout.component";
import { CustomerRotuingModule } from "./customer-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    CustomerLayoutComponent,
    ProductDetailComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CustomerRotuingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class CustomerModule {}
