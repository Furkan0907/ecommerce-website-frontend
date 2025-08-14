import { BaseResponse } from './../models/base-response.model';
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import {  Product, ProductRequest } from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl + '/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<BaseResponse<Product[]>>(this.apiUrl).pipe(
      map(response => {
        if (response.status === 200 && response.payload) {
          return response.payload;
        } else {
          throw new Error('Ürünler Yüklenemedi');
        }
      })
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<BaseResponse<Product>>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        if (response.status === 200 && response.payload) {
          return response.payload;
        } else {
          throw new Error('Ürün yüklenemedi');
        }
      })
    );
  }

  createProduct(product: ProductRequest): Observable<Product> {
    return this.http.post<BaseResponse<Product>>(this.apiUrl, product).pipe(
      map(response => {
        if (response.status === 200 && response.payload) {
          return response.payload;
        } else {
          throw new Error('Ürün oluşturulamadı');
        }
      })
    );
  }

  updateProduct(id: number, product: ProductRequest): Observable<Product> {
    return this.http.put<BaseResponse<Product>>(`${this.apiUrl}/${id}`, product).pipe(
      map(response => {
        if (response.status === 200 && response.payload) {
          return response.payload;
        } else {
          throw new Error('Ürün düzenlenemedi');
        }
      })
    );
  }
}
