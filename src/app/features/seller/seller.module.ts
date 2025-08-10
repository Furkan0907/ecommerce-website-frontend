import { NgModule } from "@angular/core";
import { SellerLayoutComponent } from "./seller-layout/seller-layout.component";
import { SellerDashboardComponent } from "./seller-dashboard/seller-dashboard.component";
import { SellerProductsComponent } from "./seller-products/seller-products.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SellerRotuingModule } from "./seller-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    SellerLayoutComponent,
    SellerDashboardComponent,
    SellerProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SellerRotuingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SellerModule {}
