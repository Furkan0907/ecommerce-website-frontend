import { Component, OnInit } from '@angular/core';
import { RefundRequest } from '../../../../core/models/refund-request.model';
import { RefundRequestService } from '../../../../core/services/refund-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-refund-requests',
  standalone: false,
  templateUrl: './seller-refund-requests.component.html',
  styleUrl: './seller-refund-requests.component.css'
})
export class SellerRefundRequestsComponent implements OnInit {
  refundRequests: RefundRequest[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private refundService: RefundRequestService, private router: Router) { }

  ngOnInit(): void {
    this.loadRefundRequests();
  }

  loadRefundRequests() {
    this.loading = true;
    this.refundService.getAllRefundRequestsBySellerId().subscribe({
      next: (requests) => {
        this.refundRequests = requests;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'An error occurred';
        this.loading = false;
      }
    });
  }

  viewRefundRequest(refundRequestId: number): void {
    this.router.navigate(['/seller/refund-requests', refundRequestId]);
  }
}
