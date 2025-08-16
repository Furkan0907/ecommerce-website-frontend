import { loadStripe } from './../../../../../../node_modules/@stripe/stripe-js';
import { Component, Input, OnInit } from '@angular/core';
import { PaymentService } from '../../../../core/services/payment.service';
import { Payment, PaymentIU } from '../../../../core/models/payment.model';
import { environment } from '../../../../../environments/environment';
import { Stripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  stripePromise: Promise<Stripe | null>;
  isLoading = false;

  constructor(private paymentService: PaymentService) {
    this.stripePromise = loadStripe(environment.stripePublishKey);
  }

  ngOnInit(): void { }

  pay(orderId: number, paymentMethod: string): void {
    this.isLoading = true;

    const paymentInput: PaymentIU = {
      orderId: orderId,
      method: paymentMethod
    };

    this.paymentService.create(paymentInput).subscribe({
      next: async (res: Payment) => {
        this.isLoading = false;

        const sessionId = res.transactionId;
        if (!sessionId) {
          console.error('Stripe session ID missing!');
          return;
        }

        const stripe = await this.stripePromise;
        if (!stripe) {
          console.error('Stripe.js failed to load');
          return;
        }

        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Stripe redirect error:', error.message);
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Payment creation failed:', err);
      }
    });
  }
}
