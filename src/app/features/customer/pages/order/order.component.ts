import { Component, OnInit } from '@angular/core';
import { Order, OrderRequest } from '../../../../core/models/order.model';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../core/services/order.service';
import { Address } from '../../../../core/models/address.model';
import { AddressService } from '../../../../core/services/address.service';
import { AuthService } from '../../../../authentication/service/auth.service';
import { PaymentService } from '../../../../core/services/payment.service';
import { Payment, PaymentIU } from '../../../../core/models/payment.model';
import { environment } from '../../../../../environments/environment';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-order',
  standalone: false,
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  order?: Order;
  loading = true;
  error?: string;
  addressDetail = false;
  addresses: Address[] = [];
  isAddressChanging = false;
  selectedAddressId?: number;
  paymentLoading = false;
  payment?: Payment | null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private addressService: AddressService,
    private authService: AuthService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadOrder(id);
      this.loadUserAddresses();
    }
  }

  loadOrder(id: number) {
    this.orderService.getById(id).subscribe({
      next: (data) => {
        this.order = data;
        this.selectedAddressId = data.address.id;
        this.loading = false;

        if (this.order.status !== 'PENDING') {
          this.loadPayment(id);
        }
      },
      error: (err) => {
        this.error = err.message || 'Order not found';
        this.loading = false;
      }
    });
  }

  loadPayment(orderId: number): void {
    this.paymentService.getByOrderId(orderId).subscribe({
      next: (res) => {
        this.payment = res;
        if (res.transactionId == null || res.transactionId == undefined) {
          res.transactionId = 'null';
        }
      },
      error: (err) => {
        console.error('Payment not found', err);
        this.payment = null;
      }
    });
  }

  loadUserAddresses() {
    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) return;

    this.addressService.getByUserId(userId).subscribe({
      next: (addresses) => this.addresses = addresses,
      error: (err) => console.error('Addresses could not be loaded', err)
    });
  }

  toggleAddressDetailClick() {
    this.addressDetail = !this.addressDetail;
  }

  toggleAddressChange() {
    this.isAddressChanging = !this.isAddressChanging;
  }

  changeAddress() {
    if (!this.order || this.selectedAddressId === this.order.address.id) {
      this.isAddressChanging = false;
      return;
    }

    if (!this.selectedAddressId) {
      alert('Please create an address');
      return;
    }

    const orderRequest = {
      userId: this.authService.getCurrentUser()?.id,
      addressId: this.selectedAddressId
    };

    this.orderService.update(this.order.id, orderRequest).subscribe({
      next: (updatedOrder) => {
        this.order = updatedOrder;
        this.isAddressChanging = false;
      },
      error: (err) => console.error('Address could not be updated', err)
    });
  }

  pay(orderId: number, paymentMethod: string) {
    this.paymentLoading = true;

    const request: PaymentIU = {
      orderId: orderId,
      method: paymentMethod
    };

    this.paymentService.create(request).subscribe({
    next: async res => {
      const stripe = await loadStripe(environment.stripePublishKey);
      if (stripe) {
        if (!res.transactionId) {
          alert('Stripe session ID not found!');
          this.paymentLoading = false;
          return;
        }
        const result = await stripe.redirectToCheckout({ sessionId: res.transactionId });
        if (result.error) {
          alert(result.error.message);
          this.paymentLoading = false;
        }
      } else {
        alert('Stripe yüklenemedi!');
        this.paymentLoading = false;
      }
    },
    error: err => {
      alert(err.message);
      this.paymentLoading = false;
    }
  });
  }
}
