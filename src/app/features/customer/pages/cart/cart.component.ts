import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { CartItem } from '../../../../core/models/cart.model';
import { AuthService } from '../../../../authentication/service/auth.service';
import { Location } from '@angular/common';
import { AddressService } from '../../../../core/services/address.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  currentUserId!: number;
  addresses = [];
  selectedAddressId = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private location: Location,
    private addressService: AddressService,
    private router: Router
  ) { }

  ngOnInit(): void {
      const user = this.authService.getCurrentUser();
      if (user && user.id) {
        this.currentUserId = user.id;
        this.loadCartItems();

        this.addressService.getByUserId(user.id).subscribe({
          next: (addresses) => {
            addresses = addresses;
            if (addresses.length > 0) {
              this.selectedAddressId = addresses[0].id;
            }
          },
          error: () => {
            console.log('Adresler yüklenemedi');
          }
        });
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

    if (!this.selectedAddressId) {
      alert('Lütfen teslimat adresi seçiniz');
      return;
    }

    this.cartService.confirmCart(this.currentUserId, this.selectedAddressId).subscribe({
      next: (order) => {
        alert('Siparişiniz başarıyla oluşturuldu');
        this.router.navigate([`order/${order.id}`]);
        this.loadCartItems();
      },
      error: (err) => {
        alert('Sipariş oluşturulamadı ' + (err.message || 'Bilinmeyen hata'));
      }
    });
  }
}
