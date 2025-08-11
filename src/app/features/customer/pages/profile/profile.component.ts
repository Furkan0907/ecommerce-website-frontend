import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../authentication/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isEditMode = false;
  currentUser: { username: string; email?: string } | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
     this.currentUser = this.authService.getCurrentUser();

    this.profileForm = this.fb.group({
      username: [this.currentUser?.username || '', Validators.required],
      email: [this.currentUser?.email || '', [Validators.required, Validators.email]]
    });
  }

  enableEdit() {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.profileForm.reset({
      username: this.currentUser?.username,
      email: this.currentUser?.email
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.currentUser = this.profileForm.value;
      this.isEditMode = false;
      console.log('Profil güncellendi:', this.profileForm.value);
    }
  }
}
