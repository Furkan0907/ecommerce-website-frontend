import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../authentication/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserRequest } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isEditMode = false;
  loading = false;
  error: string | null = null;
  currentUser!: User;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const authUser = this.authService.getCurrentUser();
    if (!authUser || !authUser.id) {
      this.error = 'Kullanıcı bilgisi bulunamadı.';
      return;
    }

    this.loadUser(authUser.id);
  }

  private passwordMatchValidator = (group: FormGroup) => {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    if (!password) return null;

    return password === confirm ? null : { passwordMismatch: true };
  };

  loadUser(userId: number): void {
    this.loading = true;
    this.userService.getById(userId).subscribe({
      next: (user) => {
        this.currentUser = user;
        this.profileForm = this.fb.group({
          username: [user.username, Validators.required],
          email: [user.email, [Validators.required, Validators.email]],
          password: ['', Validators.minLength(6)],
          confirmPassword: ['']
        }, { validators: this.passwordMatchValidator });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Kullanıcı yüklenemedi: ' + (err.message || '');
        this.loading = false;
      }
    });
  }

  enableEdit() {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    if (this.currentUser) {
      this.profileForm.reset({
        username: this.currentUser.username,
        email: this.currentUser.email,
        password: '',
        confirmPassword: ''
      });
    }
  }

  onSubmit() {
    if (!this.profileForm.valid) return;

    const formValue = this.profileForm.value;

    const updatedUser: UserRequest = {
      username: formValue.username,
      email: formValue.email,
      password: formValue.password || undefined,
      role: this.currentUser.role
    };

    this.userService.update(this.currentUser.id, updatedUser).subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isEditMode = false;
        alert('Profil başarıyla güncellendi');
        this.profileForm.get('password')?.reset();
        this.profileForm.get('confirmPassword')?.reset();
      },
      error: (err) => {
        console.log(err);
        alert('Profil güncellenemedi: ' + (err.message || 'Bilinmeyen hata'));
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
