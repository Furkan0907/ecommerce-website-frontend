import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../authentication/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-layout',
  standalone: false,
  templateUrl: './seller-layout.component.html',
  styleUrl: './seller-layout.component.css'
})
export class SellerLayoutComponent implements OnInit {
  sellerName?: string;
  sellerEmail?: string;
  sellerId?: number;

  isCollapsed = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentSellerInfo();
  }

  getCurrentSellerInfo() {
    this.sellerId = this.authService.getCurrentUser()?.id;
    this.sellerName = this.authService.getCurrentUser()?.username;
    this.sellerEmail = this.authService.getCurrentUser()?.email;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  expand() {
    this.isCollapsed = false;
  }

  collapse() {
    this.isCollapsed = true;
  }
}
