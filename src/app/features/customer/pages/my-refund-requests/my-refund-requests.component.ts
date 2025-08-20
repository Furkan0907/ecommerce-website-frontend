import { Component, OnInit } from '@angular/core';
import { RefundRequest } from '../../../../core/models/refund-request.model';
import { RefundRequestService } from '../../../../core/services/refund-request.service';
import { AuthService } from '../../../../authentication/service/auth.service';

@Component({
  selector: 'app-my-refund-requests',
  standalone: false,
  templateUrl: './my-refund-requests.component.html',
  styleUrl: './my-refund-requests.component.css'
})
export class MyRefundRequestsComponent implements OnInit {
  refundRequests: RefundRequest[] = [];
  loading = true;
  error?: string;

  constructor(
    private refundService: RefundRequestService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) {
      this.error = 'User not logged in';
      this.loading = false;
      return;
    }

    this.refundService.getAllByUserId(userId).subscribe({
      next: (requests) => {
        this.refundRequests = requests;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Could not load refund requests';
        this.loading = false;
      }
    });
  }

  cancelRequest(req: RefundRequest) {
    if (!confirm('Are you sure you want to cancel this refund request?')) return;

    this.refundService.cancelRefundRequest(req.id).subscribe({
      next: (res) => {
        req.status = res.status;
      },
      error: (err) => console.error('Could not cancel refund request', err)
    });
  }
}
