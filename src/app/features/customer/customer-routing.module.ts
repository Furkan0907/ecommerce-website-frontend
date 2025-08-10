import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerLayoutComponent } from "./customer-layout/customer-layout.component";
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";


const routes: Routes = [
  {
    path: '',
    component: CustomerLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRotuingModule {}
