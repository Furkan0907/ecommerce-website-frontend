import { Component, OnInit } from '@angular/core';
import { Complaint, ComplaintRequest } from '../../../../core/models/complaint.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from '../../../../core/services/complaint.service';
import { AuthService } from '../../../../authentication/service/auth.service';

@Component({
  selector: 'app-my-complaints',
  standalone: false,
  templateUrl: './my-complaints.component.html',
  styleUrl: './my-complaints.component.css'
})
export class MyComplaintsComponent implements OnInit {
  complaints: Complaint[] = [];
  loading = false;
  errorMessage = '';
  isAddingForm = false;

  complaintForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    private authService: AuthService
  ) {
    this.complaintForm = fb.group({
      subject: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCompaints();
  }

  loadCompaints(): void {
    this.loading = true;
    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) {
      this.loading = false;
      return;
    }

    this.complaintService.getAllByUserId(userId).subscribe({
      next: (data) => {
        this.complaints = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Could not load complaints';
        this.loading = false;
      }
    });
  }

  submitComplaint(): void {
    if (this.complaintForm.invalid) return;

    const userId = this.authService.getCurrentUser()?.id;

    const req: ComplaintRequest = {
      userId: userId,
      subject: this.complaintForm.value.subject,
      description: this.complaintForm.value.description
    };
    this.complaintService.create(req).subscribe(() => {
      this.loadCompaints();
      this.complaintForm.reset();
    });
  }

  deleteComplaint(id: number): void {
    this.complaintService.delete(id).subscribe(() => {
      this.loadCompaints();
    })
  }

  toggleAdding() {
    this.isAddingForm = !this.isAddingForm;
  }
}
