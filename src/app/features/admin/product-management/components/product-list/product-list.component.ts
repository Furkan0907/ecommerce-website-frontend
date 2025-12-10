import { Component, OnInit } from '@angular/core';
import { Product, ProductRequest } from '../../../../../core/models/product.model';
import { PageableRequest } from '../../../../../core/models/pageable.model';
import { ProductService } from '../../../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  showForm = false;
  selectedProduct: Product | null = null;
  sellerId: number = 0;

  stockInputs: { [key: number]: number } = {};

  isLoading: boolean = false;
  error?: string;

  pageableRequest: PageableRequest = {
    pageNumber: 0,
    pageSize: 10,
    columnName: 'createdAt',
    asc: true
  };

  totalElements: number = 0;
  totalPages: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading = true;
    this.error = undefined;

    this.productService.getProductsPaged(this.pageableRequest).subscribe({
      next: (page) => {
        this.products = page.content;
        this.totalElements = page.totalElement;
        this.totalPages = Math.ceil(this.totalElements / this.pageableRequest.pageSize);
        this.isLoading = false;
        this.products.forEach(p => this.stockInputs[p.id] = p.stockQuantity);
      },
      error: err => {
        this.isLoading = false;
        this.error = 'Products could not load.';
        console.error(this.error, err);
      }
    });
  }

  nextPage() {
    if (this.pageableRequest.pageNumber < this.totalPages - 1) {
      this.pageableRequest.pageNumber++;
      this.loadProducts();
    }
  }

  prevPage() {
    if (this.pageableRequest.pageNumber > 0) {
      this.pageableRequest.pageNumber--;
      this.loadProducts();
    }
  }

  openForm() {
    console.log('LIST: Yeni Ürün Modu Açılıyor...');

    this.selectedProduct = null;
    this.showForm = true;
  }

  editProduct(product: Product) {
    this.selectedProduct = product;
    this.showForm = true;
  }

  deleteProduct(id: number) {
    if (!confirm('Are you sure to delete this product?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: err => console.error(err)
    });
  }

  onFormClose(saved: boolean) {
    this.showForm = false;
    if (saved) this.loadProducts();
  }

  increaseStockQuantity(product: Product) {
      const input: ProductRequest = {
        name: product.name,
        description: product.description,
        price: product.price,
        stockQuantity: product.stockQuantity + 1,
        category: product.category,
        brand: product.brand,
        imageUrl: product.imageUrl,
        sellerId: product.seller.id
      };
      this.productService.updateProduct(product.id, input).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error(err)
      });
    }

    decreaseStockQuantity(product: Product) {
      if (product.stockQuantity <= 0) return;
      const input: ProductRequest = {
        name: product.name,
        description: product.description,
        price: product.price,
        stockQuantity: product.stockQuantity - 1,
        category: product.category,
        brand: product.brand,
        imageUrl: product.imageUrl,
        sellerId: product.seller.id
      };
      this.productService.updateProduct(product.id, input).subscribe({
        next: () => this.loadProducts(),
        error: (err) => console.error(err)
      });
    }

    updateStockQuantity(product: Product) {
      const newQuantity = this.stockInputs[product.id];
      if (newQuantity == null || newQuantity < 0) return;

      const input: ProductRequest = {
        name: product.name,
        description: product.description,
        price: product.price,
        stockQuantity: newQuantity,
        category: product.category,
        brand: product.brand,
        imageUrl: product.imageUrl,
        sellerId: product.seller.id
      };

      this.productService.updateProduct(product.id, input).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => console.error(err)
      });
    }
}
