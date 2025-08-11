import { Component, OnInit } from '@angular/core';
import { AuthService } from './authentication/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
      this.authService.authStatus$.subscribe(status => {
        this.isLoggedIn = status;
      });
  }
}
