import { Component } from '@angular/core';
import { AuthService } from '../../../../authentication/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-layout',
  standalone: false,
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.css'
})
export class CustomerLayoutComponent {
  isCollapsed = true;
  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  getCurrentUsername(): string | null {
    return this.authService.getCurrentUser()?.username || null;
  }
}
