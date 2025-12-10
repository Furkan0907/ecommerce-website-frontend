import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../../core/models/order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../../core/services/order.service';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order-detail',
  standalone: false,
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {

  order?: Order;
  orderId!: number;
  loading = true;
  error?: string;
  isUpdating = false;

  availableStatuses: string[] = ['PENDING', 'CONFIRMED', 'CANCELLED', 'SHIPPED', 'DELIVERED',  'PARTIALLY_SHIPPED', 'PARTIALLY_DELIVERED', 'PARTIALLY_RETURN_REQUESTED', 'PARTIALLY_REFUNDED', 'RETURN_REQUESTED', 'REFUNDED'];
  selectedStatus: string = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
      const id =  Number(this.route.snapshot.paramMap.get('id'));
      if (id) {
        this.orderId = id;
        this.loadOrder(id);
      } else {
        this.error = 'Order not found.';
        this.loading = false;
      }
  }

  loadOrder(id: number) {
    this.loading = true;
    this.orderService.getById(id).pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (data) => {
        this.order = data;
        this.selectedStatus = data.status;
      },
      error: (err: HttpErrorResponse) => {
        this.error = 'An error occur while loading the order or order not found.';
        console.error(err);
      }
    });
  }

  /*
  updateOrderStatus() {
    if (!this.order) return;

    if (this.selectedStatus === this.order.status) {
      alert('Select a new status.');
      return;
    }

    if (!confirm('If you confirm to change order status to "${this.selectedStatus}"?'))
  }
    */

  getStatusBadgeClass(status: string): string {
    if (!status) return 'bg-secondary';

    const normalizedStatus = status.toUpperCase().trim();

    switch (normalizedStatus) {
      case 'PENDING':
      case 'RETURN_REQUESTED':
        return 'bg-warning text-dark';

      case 'CONFIRMED':
        return 'bg-info';

      case 'SHIPPED':
      case 'PARTIALLY_SHIPPED':
        return 'bg-primary';

      case 'DELIVERED':
        return 'bg-success';

      case 'CANCELLED':
      case 'PARTIALLY_REFUNDED':
        return 'bg-dark text-white';

      default:
        return 'bg-secondary';
    }
  }
}
