import { Component, OnInit } from '@angular/core';
import { OrderItem } from '../../../../core/models/order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderItemService } from '../../../../core/services/order-item.service';
import { AuthService } from '../../../../authentication/service/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-seller-order-detail',
  standalone: false,
  templateUrl: './seller-order-detail.component.html',
  styleUrl: './seller-order-detail.component.css'
})
export class SellerOrderDetailComponent implements OnInit {
  orderId!: number;
  sellerId!: number;
  orderItems: OrderItem[] = [];
  sellerTotalAmount: number = 0;

  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private orderItemService: OrderItemService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/auth/login']);
      return;
    }
    this.sellerId = currentUser.id;

    this.route.paramMap.subscribe(params => {
      const id = params.get('orderId');
      if (id) {
        this.orderId = +id;
        this.loadOrderItems();
      }
    });
  }

  loadOrderItems() {
    this.loading = true;
    this.orderItemService.getAllByOrderId(this.orderId).pipe(
      map(items => (items || []).filter(item => item.product?.seller?.id === this.sellerId))
    ).subscribe({
      next: (items) => {
        this.orderItems = items;
        this.calculateSellerTotal();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'An error occurred';
      }
    });
  }

  calculateSellerTotal() {
    this.sellerTotalAmount = this.orderItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  markShipped(orderItemId: number): void {
    const item = this.orderItems.find(i => i.id === orderItemId);
    if (!item || item.status !== 'CONFIRMED') return;

    this.orderItemService.markOrderItemShipped(orderItemId).subscribe({
      next: () => this.loadOrderItems(),
      error: (err) => console.error(err)
    });
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  goBack() {
    this.router.navigate(['/seller/orders']);
  }

}
