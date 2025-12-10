import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../../core/models/order.model';
import { PageableRequest } from '../../../../../core/models/pageable.model';
import { OrderService } from '../../../../../core/services/order.service';

@Component({
  selector: 'app-orders-list',
  standalone: false,
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent implements OnInit {

  orders: Order[] = [];
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


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
      this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.error = undefined;

    this.orderService.getAll(this.pageableRequest).subscribe({
      next: (page) => {
        this.orders = page.content;
        this.totalElements = page.totalElement;
        this.totalPages = Math.ceil(this.totalElements / this.pageableRequest.pageSize);
        this.isLoading = false;
      },
      error: err => {
        this.isLoading = false;
        this.error = 'Orders could not load.';
        console.error(this.error, err);
      }
    });
  }

  nextPage(): void {
    if (this.pageableRequest.pageNumber < this.totalPages - 1) {
      this.pageableRequest.pageNumber++;
      this.loadOrders();
    }
  }

  prevPage(): void {
    if (this.pageableRequest.pageNumber > 0) {
      this.pageableRequest.pageNumber--;
      this.loadOrders();
    }
  }
}
