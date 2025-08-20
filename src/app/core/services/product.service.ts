import { BaseResponse } from './../models/base-response.model';
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, min, Observable } from "rxjs";
import {  Product, ProductRequest } from "../models/product.model";
import { Pageable, PageableRequest } from '../models/pageable.model';

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
          throw new Error(response.exception?.message || 'Ürünler Yüklenemedi');
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
          throw new Error(response.exception?.message || 'Ürün yüklenemedi');
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
          throw new Error(response.exception?.message || 'Ürün oluşturulamadı');
        }
      })
    );
  }

  getProductByName(name: string): Observable<Product> {
    const params = new HttpParams().set('name', name);
    return this.http.get<BaseResponse<Product>>(`${this.apiUrl}/search/by-name`, { params }).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message || 'İsimli ürün bulunamadı');
        }
      })
    );
  }

  getProductsByBrand(brand: string): Observable<Product[]> {
    const params = new HttpParams().set('brand', brand);
    return this.http.get<BaseResponse<Product[]>>(`${this.apiUrl}/search/by-brand`, { params }).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message || 'Markalı ürün bulunamadı');
        }
      })
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const params = new HttpParams().set('category', category);
    return this.http.get<BaseResponse<Product[]>>(`${this.apiUrl}/search/by-category`, { params }).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message || 'Belirtilen kategoryde ürün bulunamadı');
        }
      })
    );
  }

  getProductsByPriceRange(min: number, max: number): Observable<Product[]> {
    const params = new HttpParams()
      .set('min', min)
      .set('max', max);
    return this.http.get<BaseResponse<Product[]>>(`${this.apiUrl}/search/by-price`, { params }).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message || 'Bu fiyat aralığında ürün bulunamadı');
        }
      })
    );
  }

  getProductsByAvailability(available?: boolean): Observable<Product[]> {
    let params = new HttpParams();

    if (available != null) params = params.set('available', String(available));
    else params = params.set('available', String(true));
    return this.http.get<BaseResponse<Product[]>>(`${this.apiUrl}/search/by-availability`, { params }).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message || 'Uygun ürün bulunamadı');
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
          throw new Error(response.exception?.message || 'Ürün düzenlenemedi');
        }
      })
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<BaseResponse<Product>>(`${this.apiUrl}/${id}`).pipe(
      map(res => {
        if (res.status === 200) {
          return;
        } else {
          throw new Error(res.exception?.message || 'Ürün silinemedi');
        }
      })
    );
  }

  countProducts(): Observable<number> {
    return this.http.get<BaseResponse<number>>(`${this.apiUrl}/count`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message || 'Ürün bulunamadı');
        }
      })
    );
  }

  getProductsPaged(pageable: PageableRequest): Observable<Pageable<Product>> {
    let params = new HttpParams()
    .set('pageNumber', pageable.pageNumber)
    .set('pageSize', pageable.pageSize);

    if (pageable.asc !== null && pageable.asc !== undefined) {
      params = params.set('asc', String(pageable.asc));
    }
    if (pageable.columnName !== undefined) {
      params = params.set('columnName', pageable.columnName);
    }

    return this.http.get<BaseResponse<Pageable<Product>>>(`${this.apiUrl}/paged`, { params }).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }

  getByFilter(
    brand?: string,
    category?: string,
    minPrice?: number,
    maxPrice?: number
  ): Observable<Product[]> {
    let params = new HttpParams();

    if (brand) params = params.set('brand', brand);
    if (category) params = params.set('category', category);
    if (minPrice != null) params = params.set('minPrice', minPrice.toString());
    if (maxPrice != null) params = params.set('maxPrice', maxPrice.toString());

    return this.http.get<BaseResponse<Product[]>>(`${this.apiUrl}/filter`, { params }).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else
          throw new Error(res.exception?.message || 'Belirtilen filtrelemede ürün bulunamadı');
      })
    );
  }

  getProductsBySellerId(sellerId: number): Observable<Product[]> {
    return this.http.get<BaseResponse<Product[]>>(`${this.apiUrl}/${sellerId}/products`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message || 'Satıcının satışta ürünü bulunamadı');
        }
      })
    );
  }

  countProductBySellerId(sellerId: number): Observable<number> {
    return this.http.get<BaseResponse<number>>(`${this.apiUrl}/${sellerId}/products/count`).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message || 'Satıcının satışta ürünü bulunamadı');
        }
      })
    );
  }

  getProductsBySellerIdPageable(sellerId: number, pageable: PageableRequest): Observable<Pageable<Product>> {
    let params = new HttpParams()
    .set('pageNumber', pageable.pageNumber)
    .set('pageSize', pageable.pageSize);

    if (pageable.asc !== null && pageable.asc !== undefined) {
      params = params.set('asc', String(pageable.asc));
    }
    if (pageable.columnName !== undefined) {
      params = params.set('columnName', pageable.columnName);
    }

    return this.http.get<BaseResponse<Pageable<Product>>>(`${this.apiUrl}/${sellerId}/products/pageable`, { params }).pipe(
      map(res => {
        if (res.status === 200 && res.payload) {
          return res.payload;
        } else {
          throw new Error(res.exception?.message);
        }
      })
    );
  }
}
