import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../../../../core/models/review.model';
import { ReviewService } from '../../../../core/services/review.service';
import { Pageable, PageableRequest } from '../../../../core/models/pageable.model';

@Component({
  selector: 'app-review-list',
  standalone: false,
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent implements OnInit{
  @Input() productId!: number;
  @Input() pageSize: number = 5;

  reviews: Review[] = [];
  pageNumber = 0;
  totalElement = 0;

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews() {
    const request: PageableRequest = { pageNumber: this.pageNumber, pageSize: this.pageSize };
    this.reviewService.getByProductId(this.productId, request).subscribe({
      next: (res: Pageable<Review>) => {
        this.reviews = res.content;
        this.pageNumber = res.pageNumber;
        this.pageSize = res.pageSize;
        this.totalElement = res.totalElement;
      },
      error: (err) => console.error(err)
    });
  }

  nextPage(): void {
    if ((this.pageNumber + 1) * this.pageSize < this.totalElement) {
      this.pageNumber++;
      this.loadReviews();
    }
  }

  prevPage(): void {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.loadReviews();
    }
  }
}
