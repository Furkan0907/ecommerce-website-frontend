import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplaintService } from '../../../../core/services/complaint.service';
import { AuthService } from '../../../../authentication/service/auth.service';
import { ComplaintRequest } from '../../../../core/models/complaint.model';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  complaintForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private complaintService: ComplaintService,
    private authService: AuthService
  ) {
    this.complaintForm = this.fb.group({
      subject: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  submitComplaint(): void {
    if (this.complaintForm.invalid) return;

    const userId = this.authService.getCurrentUser()?.id;
    if (!userId) return;

    const req: ComplaintRequest = {
      userId: userId,
      subject: this.complaintForm.value.subject,
      description: this.complaintForm.value.description
    };
    this.complaintService.create(req).subscribe(() => {
      alert('Your complainy has been submitted. Thank you!');
      this.complaintForm.reset();
    });
  }
}
