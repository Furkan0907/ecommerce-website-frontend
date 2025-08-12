import { Component, OnInit } from '@angular/core';
import { CartItem, CartService } from '../../../../core/services/cart.service';
import { AuthService } from '../../../../authentication/service/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  currentUserId!: number;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
      const user = this.authService.getCurrentUser();
      if (user && user.id) {
        this.currentUserId = user.id;
        this.loadCartItems();
      } else {
        console.log('Kullanıcı bulunamadı, sepet yüklenemiyor.');
      }
  }

  loadCartItems(): void {
    this.cartService.getCartItems(this.currentUserId).subscribe({
      next: (items) => this.cartItems = items,
      error: (err) => console.error('Sepet ürünleri alırken hata:', err)
    });
  }

  increaseItemQuantity(item: CartItem): void {
    this.updateItemQuantity(item.product.id, item.quantity + 1)
  }

  decraseItemQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      this.updateItemQuantity(item.product.id, item.quantity -1);
    }
  }

  updateItemQuantity(prdouctId: number, newQuantity: number): void {
    if (newQuantity < 1) return;

    this.cartService.updateItemQuantity(this.currentUserId, prdouctId, newQuantity).subscribe({
      next: (updatedItem) => {
        const index = this.cartItems.findIndex(i => i.product.id === prdouctId);
        if (index !== -1) this.cartItems[index] = updatedItem;
      },
      error: (err) => console.error('Miktar güncellenirken hata:',err)
    });
  }

  removeItemFromCart(item: CartItem): void {
    this.cartService.removeItemFromCart(this.currentUserId, item.product.id).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(i => i.product.id !== item.product.id);
      },
      error: (err) => console.error('Ürün kaldırılırken hata:', err)
    });
  }

  clearCart(): void {
    this.cartService.clearCart(this.currentUserId).subscribe({
      next: () => {
        this.cartItems = [];
      },
      error: (err) => console.error('Sepet temizlenirken hata:', err)
    });
  }

  onQuantityInputChange(item: CartItem, event: Event): void {
    const input = event.target as HTMLInputElement;
    const qty = Number(input.value);
    if (!isNaN(qty) && qty > 0) {
      this.updateItemQuantity(item.product.id, qty);
    } else {
      console.warn('Geçersiz miktar girildi:', input.value);
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    console.log('Sepet onaylandı. Sonradan backendle bağlayacağız');
  }

  goBack(): void {
    this.location.back();
  }
}
