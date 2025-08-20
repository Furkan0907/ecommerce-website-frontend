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
import { OrderComponent } from './pages/order/order.component';
import { MyOrdersComponent } from './pages/my-orders/my-orders.component';
import { MyAddressesComponent } from './pages/my-addresses/my-addresses.component';
import { AddressComponent } from './pages/address/address.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ReviewComponent } from './pages/review/review.component';
import { ReviewListComponent } from './pages/review-list/review-list.component';
import { MyReviewsComponent } from './pages/my-reviews/my-reviews.component';
import { MyComplaintsComponent } from './pages/my-complaints/my-complaints.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RefundRequestComponent } from './pages/refund-request/refund-request.component';
import { MyRefundRequestsComponent } from './pages/my-refund-requests/my-refund-requests.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    CustomerLayoutComponent,
    ProductDetailComponent,
    CartComponent,
    OrderComponent,
    MyOrdersComponent,
    MyAddressesComponent,
    AddressComponent,
    PaymentComponent,
    ReviewComponent,
    ReviewListComponent,
    MyReviewsComponent,
    MyComplaintsComponent,
    ContactComponent,
    RefundRequestComponent,
    MyRefundRequestsComponent
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
