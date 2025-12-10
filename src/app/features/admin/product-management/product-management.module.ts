import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductUpsertComponent } from './components/product-upsert/product-upsert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductUpsertComponent
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductManagementModule { }
