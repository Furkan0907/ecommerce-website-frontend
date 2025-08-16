import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerLayoutComponent } from "./pages/customer-layout/customer-layout.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";
import { CartComponent } from "./pages/cart/cart.component";
import { OrderComponent } from "./pages/order/order.component";
import { MyOrdersComponent } from "./pages/my-orders/my-orders.component";
import { MyAddressesComponent } from "./pages/my-addresses/my-addresses.component";
import { AddressComponent } from "./pages/address/address.component";


const routes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      { path: 'cart', component: CartComponent },
      { path: 'order/:id', component: OrderComponent },
      { path: 'profile/my-orders', component: MyOrdersComponent },
      { path: 'profile/my-addresses', component: MyAddressesComponent },
      { path: 'address/:id', component: AddressComponent },
      { path: 'address', component: AddressComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRotuingModule {}
