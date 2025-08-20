import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RefundRequestRequest } from '../../../../core/models/refund-request.model';
import { OrderItem } from '../../../../core/models/order.model';
import { RefundRequestService } from '../../../../core/services/refund-request.service';
import { ActivatedRoute } from '@angular/router';
import { OrderItemService } from '../../../../core/services/order-item.service';

@Component({
  selector: 'app-refund-request',
  standalone: false,
  templateUrl: './refund-request.component.html',
  styleUrl: './refund-request.component.css'
})
export class RefundRequestComponent implements OnInit {
  @Input() orderItem!: OrderItem;
  refundForm: FormGroup;
  submitting = false;
  successMessage?: string;
  errorMessage?: string;

  constructor(
    private fb: FormBuilder,
    private refundService: RefundRequestService,
    private route: ActivatedRoute,
    private orderItemService: OrderItemService
  ) {
    this.refundForm = this.fb.group({
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    const itemId = Number(this.route.snapshot.paramMap.get('itemId'));
    if (itemId) {
      this.orderItemService.getById(itemId).subscribe({
        next: item => this.orderItem = item,
        error: err => console.error(err)
      });
    }
  }

  submitRefund(): void {
    if (!this.orderItem || this.refundForm.invalid) return;

    this.submitting = true;
    this.successMessage = undefined;
    this.errorMessage = undefined;

    const request: RefundRequestRequest = {
      orderItemId: this.orderItem.id,
      reason: this.refundForm.value.reason
    };

    this.refundService.create(request).subscribe({
      next: res => {
        this.successMessage = 'Refund request successfully created!';
        this.submitting = false;
        this.refundForm.reset();
      },
      error: err => {
        this.errorMessage = err.message || 'Refund request failed';
        this.submitting = false;
      }
    });
  }
}
