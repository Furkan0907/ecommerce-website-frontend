import { Component, OnInit } from '@angular/core';
import { RefundRequest } from '../../../../core/models/refund-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RefundRequestService } from '../../../../core/services/refund-request.service';

@Component({
  selector: 'app-seller-refund-request-detail',
  standalone: false,
  templateUrl: './seller-refund-request-detail.component.html',
  styleUrl: './seller-refund-request-detail.component.css'
})
export class SellerRefundRequestDetailComponent implements OnInit {
  refundRequest!: RefundRequest;
  refundRequestId!: number;
  loading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private refundRequestService: RefundRequestService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('refundRequestId');
      if (id) {
        this.refundRequestId = +id;
        this.loadRefundRequest();
      }
    });
  }

  loadRefundRequest() {
    this.loading = true;
    this.refundRequestService.getRefundRequestForSeller(this.refundRequestId).subscribe({
      next: (res) => {
        this.refundRequest = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'An error occurred';
        this.loading = false;
      }
    });
  }

  approve() {
    this.refundRequestService.approveRefundRequest(this.refundRequestId).subscribe({
      next: () => this.loadRefundRequest(),
      error: (err) => console.error(err)
    });
  }

  reject() {
    this.refundRequestService.rejectRefundRequest(this.refundRequestId).subscribe({
      next: () => this.loadRefundRequest(),
      error: (err) => console.error(err)
    });
  }

  back() {
    this.router.navigate(['/seller/refund-requests']);
  }
}
