import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { Router } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../authentication/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.errorMessage = null;

    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Ürünler yüklenirken bir hata oluştu.'
        this.loading = false;
      }
    });
  }

  goToDetails(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  addToCart(product: Product) {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      alert('Please Login!');
      return;
    }

    const userId = currentUser.id;
    if (product.stockQuantity === 0) {
      alert('The product is out of stock');
      return;
    }

    this.cartService.addItemToCart(userId, product.id).subscribe({
      next: () => {
        this.toastr.success(`${product.name} added to cart!`);
      },
      error: (err) => {
        this.toastr.error('Error while adding to cart');
      }
    });
  }
}
