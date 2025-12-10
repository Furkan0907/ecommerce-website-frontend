import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../core/models/order.model';
import { Pageable, PageableRequest } from '../../../../core/models/pageable.model';
import { OrderService } from '../../../../core/services/order.service';
import { AuthService } from '../../../../authentication/service/auth.service';
import { Router } from '@angular/router';
import { OrderItemService } from '../../../../core/services/order-item.service';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-seller-orders',
  standalone: false,
  templateUrl: './seller-orders.component.html',
  styleUrl: './seller-orders.component.css'
})
export class SellerOrdersComponent implements OnInit {
  orders: Order[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  statusFilter: string = '';
  SellerTotalAmount: number = 0;
  sellerId!: number;

  constructor(private orderService: OrderService, private authService: AuthService, private router: Router, private orderItemService: OrderItemService) { }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.sellerId = currentUser.id;
      this.loadOrders();
    }
  }

  loadOrders(): void {
    const pageable: PageableRequest = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    };

    this.orderService.getOrdersBySellerIdPageable(this.sellerId, pageable, this.statusFilter).subscribe({
      next: (res: Pageable<Order>) => {
        this.orders = res.content;
        this.pageNumber = res.pageNumber;
        this.pageSize = res.pageSize;
        this.totalElements = res.totalElement;
      },
      error: (err) => console.error(err)
    });
  }

  viewOrder(orderId: number): void {
    this.router.navigate(['/seller/orders', orderId]);
  }

  markShipped(orderItemId: number): void {
    this.orderService.getOrderStatus(orderItemId).pipe(
      switchMap((status) => {
        if (status !== 'CONFIRMED') {
          return EMPTY;
        }
        return this.orderItemService.markOrderItemShipped(orderItemId);
      })
    ).subscribe({
      next: () => this.loadOrders(),
      error: (err) => console.error(err)
    });
  }

  nextPage(): void {
    if ((this.pageNumber + 1) * this.pageSize >= this.totalElements) return;
    this.pageNumber++;
    this.loadOrders();
  }

  prevPage(): void {
    if (this.pageNumber === 0) return;
    this.pageNumber--;
    this.loadOrders();
  }

  onStatusFilterChange(status: string): void {
    this.statusFilter = status;
    this.pageNumber = 0;
    this.loadOrders();
  }

  refresh(): void {
    this.loadOrders();
  }
}
