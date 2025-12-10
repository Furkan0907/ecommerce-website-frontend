import { Component, OnInit } from '@angular/core';
import { Product, ProductRequest } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../authentication/service/auth.service';

@Component({
  selector: 'app-seller-products',
  standalone: false,
  templateUrl: './seller-products.component.html',
  styleUrl: './seller-products.component.css'
})
export class SellerProductsComponent implements OnInit {
  products: Product[] = [];
  showForm = false;
  selectedProduct: Product | null = null;
  sellerId: number = 0;

  stockInputs: { [key: number]: number} = {};

  pageNumber = 0;
  pageSize = 10;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const id = this.authService.getCurrentUser()?.id;
    if (!id) return;
    this.sellerId = id;
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProductsBySellerIdPageable(this.sellerId, {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }).subscribe({
      next: (page) => {
        this.products = page.content;
        this.products.forEach(p => this.stockInputs[p.id] = p.stockQuantity);
      },
      error: err => console.error('Products could not get:',err)
    });
  }

  nextPage(): void {
    if (this.products.length > (this.pageNumber + 1) * this.pageSize) {
      this.pageNumber++;
      this.loadProducts();
    }
  }

  prevPage(): void {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.loadProducts();
    }
  }

  openForm() {
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
