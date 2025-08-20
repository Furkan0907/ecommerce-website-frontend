import { Component, OnInit } from '@angular/core';
import { Review, ReviewRequest } from '../../../../core/models/review.model';
import { ReviewService } from '../../../../core/services/review.service';
import { AuthService } from '../../../../authentication/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-reviews',
  standalone: false,
  templateUrl: './my-reviews.component.html',
  styleUrl: './my-reviews.component.css'
})
export class MyReviewsComponent implements OnInit {
  reviews: Review[] = [];
  loading = false;
  errorMessage: string | null = null;
  editingReviewId: number | null = null;
  reviewForm;

  constructor(
    private reviewService: ReviewService,
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.reviewForm = this.fb.group({
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() {
    const currentUser = this.authService.getCurrentUser();
    if(!currentUser) {
      this.errorMessage = 'Please login to see your reviews';
      return;
    }

    this.loading = true;
    this.reviewService.getByUserId(currentUser.id).subscribe({
      next: (res) => {
        this.reviews = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load reviews';
        this.loading = false;
      }
    });
  }

  deleteReview(reviewId: number) {
    if (!confirm('Are you sure you want to delete this review?')) return;

    this.reviewService.delete(reviewId).subscribe({
      next: () => {
        this.toastr.success('Review deleted!');
        this.reviews = this.reviews.filter(r => r.id !== reviewId);
      },
      error: (err) => {
        this.toastr.error('Failed to delete review');
      }
    });
  }

  editReview(review: Review) {
    this.editingReviewId = review.id;
    this.reviewForm.setValue({
      rating: review.rating,
      content: review.content
    });
  }

  cancelEdit() {
    this.editingReviewId = null;
    this.reviewForm.reset({ rating: 5, content: '' });
  }

  submitEdit() {
    if (!this.editingReviewId) return;

    const review = this.reviews.find(r => r.id === this.editingReviewId);
    const currentUser = this.authService.getCurrentUser();

    if (!review || !currentUser) {
      console.error('Review or user not found.');
      return;
    }

    const updatedReview: ReviewRequest = {
      productId: review.product.id,
      userId: currentUser.id,
      content: this.reviewForm.value.content!,
      rating: this.reviewForm.value.rating!
    };

    this.reviewService.update(this.editingReviewId, updatedReview).subscribe({
      next: (res) => {
        this.toastr.success('Review updated!');
        const index = this.reviews.findIndex(r => r.id === this.editingReviewId);
        if (index !== -1) this.reviews[index] = res;
        this.cancelEdit();
      },
      error: (err) => this.toastr.error('Failed to update review')
    });
  }
}
