import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CustomerLayoutComponent } from "./customer-layout/customer-layout.component";
import { CustomerRotuingModule } from "./customer-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    CustomerLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CustomerRotuingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CustomerModule {}
