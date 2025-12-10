import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },

      {
        path: 'orders',
        loadChildren: () =>
          import('../admin/order-management/order-management.module').then(
            (m) => m.OrderManagementModule
          ),
      },

      {
        path: 'products',
        loadChildren: () =>
          import('../admin/product-management/product-management.module').then(
            (m) => m.ProductManagementModule
          ),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRouterModule {}
