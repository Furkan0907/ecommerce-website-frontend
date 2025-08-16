import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../authentication/service/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../../../core/services/cart.service';
import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-customer-layout',
  standalone: false,
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent implements OnInit {
  isCollapsed = true;
  cartItemCount = 0;
  pendingOrderId: number = -1;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
      this.cartService.cartItemCount$.subscribe(count => {
        this.cartItemCount = count;
      });

      this.cartService.loadCartItemCount();
      this.hasOrderPending();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  getCurrentUsername(): string | null {
    return this.authService.getCurrentUser()?.username || null;
  }

  hasOrderPending(): void {
    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) {
      this.pendingOrderId = -1;
      return;
    }

    this.orderService.getByUserId(userId).subscribe({
      next: (orders) => {
        const pendingOrder = orders.find(o => o.status === 'PENDING');
        if (pendingOrder) {
          this.pendingOrderId = pendingOrder?.id;
        }
      },
      error: (err) => {
        console.error('Sipariş alınamadı: ', err);
        this.pendingOrderId = -1;
      }
    });
  }

  get showBackButton(): boolean {
    return this.router.url !== '/';
  }

  goBack() {
    const segments = this.router.url.split('/');
    if (segments.length > 2) {
      const parentPath = segments.slice(0, -1).join('/');
      this.router.navigate([parentPath]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
