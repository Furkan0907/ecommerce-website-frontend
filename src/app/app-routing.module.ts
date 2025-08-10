import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './core/guard/role.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'seller',
    loadChildren: () =>
      import('./features/seller/seller.module').then(m => m.SellerModule),
    canActivate: [RoleGuard],
    data: { role: 'SELLER' }
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [RoleGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
