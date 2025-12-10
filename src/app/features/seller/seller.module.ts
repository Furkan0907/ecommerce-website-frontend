import { NgModule } from "@angular/core";
import { SellerLayoutComponent } from "./pages/seller-layout/seller-layout.component";
import { SellerDashboardComponent } from "./pages/seller-dashboard/seller-dashboard.component";
import { SellerProductsComponent } from "./pages/seller-products/seller-products.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SellerRotuingModule } from "./seller-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SellerProductFormComponent } from './pages/seller-product-form/seller-product-form.component';
import { SellerOrdersComponent } from './pages/seller-orders/seller-orders.component';
import { SellerOrderDetailComponent } from './pages/seller-order-detail/seller-order-detail.component';
import { SellerRefundRequestsComponent } from './pages/seller-refund-requests/seller-refund-requests.component';
import { SellerRefundRequestDetailComponent } from './pages/seller-refund-request-detail/seller-refund-request-detail.component';

@NgModule({
  declarations: [
    SellerLayoutComponent,
    SellerDashboardComponent,
    SellerProductsComponent,
    SellerProductFormComponent,
    SellerOrdersComponent,
    SellerOrderDetailComponent,
    SellerRefundRequestsComponent,
    SellerRefundRequestDetailComponent
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
