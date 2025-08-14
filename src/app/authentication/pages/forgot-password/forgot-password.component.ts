import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.forgotPasswordForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(6)]],
        confirmPassword: ['']
      }, { validators: this.passwordMatchValidator });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password && confirm && password !== confirm ? { passwordMismatch: true } : null;
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const formValue = this.forgotPasswordForm.value;

      this.authService.checkEmailExists(formValue.email).subscribe({
        next: (exists) => {
          if (!exists) {
            this.errorMessage = 'This email has not registered';
            this.successMessage = null;
            return;
          }

          this.authService.resetPassword(formValue.email, formValue.password).subscribe({
            next: () => {
              this.successMessage = 'Password updated successfully';
              this.errorMessage = null;
              this.forgotPasswordForm.reset();
            },
            error: (err) => {
              this.errorMessage = err.message || 'Password could not updated';
              this.successMessage = null;
            }
          });
        },
        error: (err) => {
          this.errorMessage = err.message || 'An error occurred while email checking.';
          this.successMessage = null;
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
