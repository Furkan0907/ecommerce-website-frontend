import { NgModule } from "@angular/core";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SellerRotuingModule } from "../seller/seller-routing.module";
import { AdminRouterModule } from "./admin-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminDashboardComponent,
    AdminSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule {}
