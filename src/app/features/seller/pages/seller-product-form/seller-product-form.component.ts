import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-seller-product-form',
  standalone: false,
  templateUrl: './seller-product-form.component.html',
  styleUrl: './seller-product-form.component.css'
})
export class SellerProductFormComponent {
    @Input() product: Product | null = null;
    @Output() close = new EventEmitter<boolean>();

    form!: FormGroup;

    constructor(private fb: FormBuilder, private productService: ProductService) {}

    ngOnInit(): void {
      this.form = this.fb.group({
        name: [this.product?.name || '', Validators.required],
        description: [this.product?.description || '',],
        price: [this.product?.price || 0, Validators.required],
        stockQuantity: [this.product?.stockQuantity || 0, Validators.required],
        category: [this.product?.category || '', Validators.required],
        brand: [this.product?.brand || '', Validators.required],
        imageUrl: [this.product?.imageUrl || '', Validators.required],
        sellerId: [this.product?.seller.id]
      });
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
    }
}
