import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { ProductUpsertComponent } from "./components/product-upsert/product-upsert.component";


const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'upsert', component: ProductUpsertComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
