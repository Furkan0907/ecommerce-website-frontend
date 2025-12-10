import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../../core/services/product.service';
import { Product } from '../../../../../core/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-upsert',
  standalone: false,
  templateUrl: './product-upsert.component.html',
  styleUrl: './product-upsert.component.css'
})
export class ProductUpsertComponent implements OnInit, OnChanges {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<boolean>();

  form !: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    if (!this.form) {
      this.initializeForm(null);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product']) {
        const currentProduct = changes['product'].currentValue;

        if (currentProduct) {
            this.initializeForm(currentProduct);
        } else if (!this.form) {
            this.initializeForm(null);
        }
      }
  }

  initializeForm(product: Product | null): void {
    if (this.form) {
        this.form.patchValue({
          name: product?.name || '',
          description: product?.description || '',
          price: product?.price || 0,
          stockQuantity: product?.stockQuantity || 0,
          category: product?.category || '',
          brand: product?.brand || '',
          imageUrl: product?.imageUrl || '',
          sellerId: product?.seller.id || 0
        });
    } else {
      this.form = this.fb.group({
                id: [product?.id || null],
                name: [product?.name || '', Validators.required],
                description: [product?.description || ''],
                price: [product?.price || 0, Validators.required],
                stockQuantity: [product?.stockQuantity || 0, Validators.required],
                category: [product?.category || '', Validators.required],
                brand: [product?.brand || '', Validators.required],
                imageUrl: [product?.imageUrl || '', Validators.required],
                sellerId: [product?.seller.id || 0, Validators.required]
            });
    }
  }

  save() {
    if (this.form.invalid) return;

    const input = this.form.value;
    if (this.product) {
      this.productService.updateProduct(this.product.id, input).subscribe({
        next: () => this.close.emit(true),
        error: err => console.error(err)
      });
    } else {
      this.productService.createProduct(input).subscribe({
        next: () => this.close.emit(true),
        error: err => console.error(err)
      });
    }
  }

  cancel() {
    this.close.emit(false);
    this.router.navigate(['/admin/products']);
  }
}
