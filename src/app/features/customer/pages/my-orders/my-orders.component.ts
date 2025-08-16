import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../core/models/order.model';
import { OrderService } from '../../../../core/services/order.service';
import { AuthService } from '../../../../authentication/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  standalone: false,
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit{
  orders: Order[] = [];
  loading = true;
  error?: string;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getCurrentUser()?.id;
    if (userId) {
      this.orderService.getByUserId(userId).subscribe({
        next: (data) => {
          this.orders = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Could not load orders';
          this.loading = false;
        }
      });
    } else {
      this.error = 'User not logged in';
      this.loading = false;
    }
  }

  cancelOrder(orderId: number) {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancel(orderId).subscribe({
        next: (updatedOrder) => {
          const index = this.orders.findIndex(o => o.id === updatedOrder.id);
          if (index !== -1) {
            this.orders[index] = updatedOrder;
          }
        },
        error: (err) => {
          alert(err.message || 'Failed to cancel order');
        }
      })
    }
  }
}
