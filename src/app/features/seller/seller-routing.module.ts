import { RouterModule, Routes } from "@angular/router";
import { SellerLayoutComponent } from "./pages/seller-layout/seller-layout.component";
import { SellerDashboardComponent } from "./pages/seller-dashboard/seller-dashboard.component";
import { SellerProductsComponent } from "./pages/seller-products/seller-products.component";
import { NgModule } from "@angular/core";
import { SellerOrdersComponent } from "./pages/seller-orders/seller-orders.component";
import { SellerOrderDetailComponent } from "./pages/seller-order-detail/seller-order-detail.component";
import { SellerRefundRequestsComponent } from "./pages/seller-refund-requests/seller-refund-requests.component";
import { SellerRefundRequestDetailComponent } from "./pages/seller-refund-request-detail/seller-refund-request-detail.component";


const routes: Routes = [
  {
    path: '',
    component: SellerLayoutComponent,
    children: [
      { path: 'dashboard', component: SellerDashboardComponent},
      { path: 'products', component: SellerProductsComponent},
      { path: 'orders', component: SellerOrdersComponent },
      { path: 'orders/:orderId', component: SellerOrderDetailComponent },
      { path: 'refund-requests', component: SellerRefundRequestsComponent },
      { path: 'refund-requests/:refundRequestId', component: SellerRefundRequestDetailComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRotuingModule {}
