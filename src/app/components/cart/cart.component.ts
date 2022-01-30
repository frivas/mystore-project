import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/Cart';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  quantity = 0;

  constructor(private cartService: CartService) {
    this.cart = {
      products: [],
      totalPrice: 0,
      numberOfProducts: 0,
      confirmed: false
    };
    console.log(
      `Constructor Products => ${JSON.stringify(this.cart, null, 2)}`
    );
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCurrentCart();
    console.log(
      `Cart From Cart Component => ${JSON.stringify(this.cart, null, 2)}`
    );
  }

  onChange(product: Product, quantity: number): void {
    this.quantity = quantity;
    this.cartService.addProductToCart(product, this.quantity);
  }

  deleteProduct(product: Product) {
    this.cartService.removeProductFromCart(product, 0);
  }

  setQuantity(quantity: number): number {
    return (this.quantity = quantity);
  }
}
