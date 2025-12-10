import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementRoutingModule } from './order-management-routing.module';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderSearchComponent } from './components/order-search/order-search.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';


@NgModule({
  declarations: [
    OrdersListComponent,
    OrderSearchComponent,
    OrderDetailComponent
  ],
  imports: [
    CommonModule,
    OrderManagementRoutingModule
  ]
})
export class OrderManagementModule { }
