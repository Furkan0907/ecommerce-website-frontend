import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../authentication/service/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-customer-layout',
  standalone: false,
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent implements OnInit {
  isCollapsed = true;
  cartItemCount = 0;

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
      this.cartService.cartItemCount$.subscribe(count => {
        console.log('Cart item count:', count);
        this.cartItemCount = count;
      });

      this.cartService.loadCartItemCount();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  getCurrentUsername(): string | null {
    return this.authService.getCurrentUser()?.username || null;
  }
}
