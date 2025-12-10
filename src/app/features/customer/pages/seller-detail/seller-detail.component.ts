import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user.model';
import { Product } from '../../../../core/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-seller-detail',
  standalone: false,
  templateUrl: './seller-detail.component.html',
  styleUrl: './seller-detail.component.css'
})
export class SellerDetailComponent implements OnInit {

  sellerId!: number;
  seller!: User;
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.sellerId = Number(params.get('id'));
      this.loadSeller();
      this.loadProducts();
    });
  }

  loadSeller() {
    const productId = Number(this.route.snapshot.paramMap.get('productId'));
    this.productService.getSellerByProductId(productId).subscribe(data => {
      this.seller = data;
    });
  }

  loadProducts() {
    this.sellerId = Number(this.route.snapshot.queryParamMap.get('sellerId'));
    this.productService.getProductsBySellerId(this.sellerId).subscribe(data => {
      this.products = data;
    });
  }
}
