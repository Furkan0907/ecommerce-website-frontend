import { Component, OnInit } from '@angular/core';
import { Address } from '../../../../core/models/address.model';
import { AddressService } from '../../../../core/services/address.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../authentication/service/auth.service';

@Component({
  selector: 'app-my-addresses',
  standalone: false,
  templateUrl: './my-addresses.component.html',
  styleUrl: './my-addresses.component.css'
})
export class MyAddressesComponent implements OnInit {
  addresses: Address[] = [];

  constructor(
    private authService: AuthService,
    private addressService: AddressService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadAddress();
  }

  loadAddress() {
    const userId = this.authService.getCurrentUser()?.id;

    if (userId !== undefined) {
      this.addressService.getByUserId(userId).subscribe({
        next: (data) => this.addresses = data,
        error: (err) => console.error(err)
      });
    } else {
      console.error('User not found for this id: ', userId);
    }
  }

  editAddress(address: Address) {
    this.router.navigate(['/address', address.id]);
  }

  createAddress() {
    this.router.navigate(['/address']);
  }

  deleteAddress(address: Address) {
    const userId = this.authService.getCurrentUser()?.id;

    if (userId !== undefined) {
      this.addressService.delete(address.id).subscribe({
        next: () => {
          this.addresses = this.addresses.filter(a => a.id !== address.id);
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      console.error('Address not found');
    }
  }
}
