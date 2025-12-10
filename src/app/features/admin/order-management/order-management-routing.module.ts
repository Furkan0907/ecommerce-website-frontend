import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderSearchComponent } from './components/order-search/order-search.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

const routes: Routes = [

  { path: '', component: OrdersListComponent },
  { path: 'search', component: OrderSearchComponent },
  { path: ':id', component: OrderDetailComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
