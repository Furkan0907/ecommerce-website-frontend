import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../../../core/services/address.service';
import { AuthService } from '../../../../authentication/service/auth.service';
import { AddressRequest } from '../../../../core/models/address.model';

@Component({
  selector: 'app-address',
  standalone: false,
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent implements OnInit {
  addressId: number | null = null;
  addressForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private addressService: AddressService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.addressForm = this.fb.group({
      city: ['', Validators.required],
      district: ['', Validators.required],
      fullAddress: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });
  }

  ngOnInit(): void {
      this.addressId = Number(this.route.snapshot.paramMap.get('id')) || null;

      if (this.addressId) {
        this.addressService.getById(this.addressId).subscribe({
          next: (data) => this.addressForm.patchValue(data)
        });
      }
  }

  onSubmit() {
    if (!this.addressForm.valid) return;

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    const payload: AddressRequest = {
      ...this.addressForm.value,
      userId: currentUser.id
    };

    if (this.addressId) {
      this.addressService.update(this.addressId, payload).subscribe({
        next: () => this.router.navigate(['/profile/my-addresses'])
      });
    } else {
      this.addressService.save(payload).subscribe({
        next: () => this.router.navigate(['/profile/my-addresses'])
      });
    }
  }

  cancel() {
    this.router.navigate(['/profile/my-addresses']);
  }
}
