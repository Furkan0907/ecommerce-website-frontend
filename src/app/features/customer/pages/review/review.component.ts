import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReviewService } from '../../../../core/services/review.service';
import { AuthService } from '../../../../authentication/service/auth.service';
import { ReviewRequest } from '../../../../core/models/review.model';
import { Product } from '../../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {
  productId!: number;
  reviewForm: FormGroup;
  product?: Product;

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private authService: AuthService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.reviewForm = this.fb.group({
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('productId');
      if (id) {
        this.productId = +id;
        this.loadProduct();
      }
    });
  }

  loadProduct(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => this.product = res,
      error: () => console.error('Product not found')
    });
  }

  submit(): void {
    if (!this.productId) return;

    if (this.reviewForm.valid) {
      const userId = this.authService.getCurrentUser()?.id;
      if (!userId) return;

      const review: ReviewRequest = {
        productId: this.productId,
        userId: userId,
        content: this.reviewForm.value.content,
        rating: this.reviewForm.value.rating
      };

      this.reviewService.create(review).subscribe({
        next: (res) => {
          console.log('Review created:', res);
          this.reviewForm.reset({ rating: 5, content: ''});
        },
        error: (err) => {
          console.log('Review create failed', err);
        }
      });
    }
  }
}
