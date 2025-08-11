import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product-resonse';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../authentication/service/auth.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productSerive: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productSerive.getProductById(id).subscribe({
        next: (data) => {
          this.product = data;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.loading = false;
        }
      });
    }
  }

  backToProdcuts() {
    this.router.navigate(['/']);
  }

  addToCart(product: Product) {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      alert('Please Login!');
      return;
    }

    if (product.stockQuantity === 0) {
      alert('The product is out of stock');
      return;
    }

    this.cartService.addItemToCart(currentUser.id, product.id).subscribe({
      next: (cartItem) => {
        console.log('Added to cart:', cartItem);
      },
      error: (err) => {
        console.error('Error while adding to cart:', err);
      }
    });
  }
}
