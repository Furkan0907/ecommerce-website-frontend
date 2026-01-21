import { NgModule } from "@angular/core";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AdminRouterModule } from "./admin-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { BaseChartDirective } from 'ng2-charts';


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
    BaseChartDirective
  ]
})
export class AdminModule {}
