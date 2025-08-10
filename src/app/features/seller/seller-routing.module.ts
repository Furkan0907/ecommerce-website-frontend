import { RouterModule, Routes } from "@angular/router";
import { SellerLayoutComponent } from "./seller-layout/seller-layout.component";
import { SellerDashboardComponent } from "./seller-dashboard/seller-dashboard.component";
import { SellerProductsComponent } from "./seller-products/seller-products.component";
import { NgModule } from "@angular/core";


const routes: Routes = [
  {
    path: '',
    component: SellerLayoutComponent,
    children: [
      { path: '', component: SellerDashboardComponent},
      { path: 'products', component: SellerProductsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRotuingModule {}
