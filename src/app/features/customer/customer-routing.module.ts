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
import { ReviewComponent } from "./pages/review/review.component";
import { MyReviewsComponent } from "./pages/my-reviews/my-reviews.component";
import { MyComplaintsComponent } from "./pages/my-complaints/my-complaints.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { RefundRequestComponent } from "./pages/refund-request/refund-request.component";
import { MyRefundRequestsComponent } from "./pages/my-refund-requests/my-refund-requests.component";


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
      { path: 'address', component: AddressComponent },
      { path: 'review/:productId', component: ReviewComponent },
      { path: 'profile/my-reviews', component: MyReviewsComponent},
      { path: 'profile/my-complaints', component: MyComplaintsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'refund-request/:itemId', component: RefundRequestComponent },
      { path: 'profile/my-refund-requests', component: MyRefundRequestsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRotuingModule {}
