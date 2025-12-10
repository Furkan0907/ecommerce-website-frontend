import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../core/models/order.model';
import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { AuthService } from '../../../../authentication/service/auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../../../../core/services/order.service';
import { RefundRequestService } from '../../../../core/services/refund-request.service';

@Component({
  selector: 'app-seller-dashboard',
  standalone: false,
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.css'
})
export class SellerDashboardComponent implements OnInit {
  products: Product[] = [];
  productCount: number = 0;
  sellerId: number = 0;
  orderCount: number = 0;
  refundRequestCount: number = 0;

  pageNumber: number = 0;
  pageSize: number = 10;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService,
    private refundRequestService: RefundRequestService
  ) { }

  ngOnInit(): void {
    const id = this.authService.getCurrentUser()?.id;
    if (!id) return;

    this.sellerId = id;
    this.loadProductCount();
    this.loadProducts();
    this.loadOrderCount();
    this.loadRefundRequestCount();
  }

  loadProductCount(): void {
    this.productService.countProductBySellerId(this.sellerId).subscribe({
      next: count => this.productCount = count,
      error: err => console.error('Product count could not get:', err)
    });
  }

  loadProducts(): void {
    this.productService.getProductsBySellerIdPageable(this.sellerId, {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }).subscribe({
      next: page => this.products = page.content,
      error: err => console.error('Products could not get:',err)
    });
  }

  loadOrderCount(): void {
    this.orderService.getOrdersBySellerIdPageable(this.sellerId, { pageNumber: this.pageNumber, pageSize: 1000 }, '').subscribe({
      next: (res) => this.orderCount = res.totalElement,
      error: (err) => console.error(err)
    });
  }

  loadRefundRequestCount(): void {
    this.refundRequestService.getAllRefundRequestsBySellerId().subscribe({
      next: (res) => this.refundRequestCount = res.length,
      error: (err) => console.error(err)
    });
  }

  nextPage(): void {
    this.pageNumber++;
    this.loadProducts();
  }

  prevPage(): void {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.loadProducts();
    }
  }

  goProducts() {
    this.router.navigate(['/seller/products']);
  }

  goOrders() {
    this.router.navigate(['/seller/orders']);
  }

  goRefundRequests(): void {
    this.router.navigate(['/seller/refund-requests']);
  }
}
