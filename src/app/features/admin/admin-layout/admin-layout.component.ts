import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../authentication/service/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: false,
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent implements OnInit {
    user?: User;

    constructor(
      private authService: AuthService,
      private router: Router,
      private location: Location
    ) { }

    ngOnInit() {

    }

    logout() {
      this.authService.logout().subscribe(() => {
        this.router.navigate(['/auth/login']);
      });
    }

    getCurrentUsername(): string | null {
      if (this.isLoggedIn()) {
        return this.authService.getCurrentUser()?.username || null;
      } else {
        return 'Guest | Please login';
      }
    }

    get showBackButton(): boolean {
      return this.router.url !== '/admin';
    }

    goBack() {
      this.location.back();
    }

    isLoggedIn() {
      if (!this.authService.hasValidToken()) return false;
      return true;
    }
}
