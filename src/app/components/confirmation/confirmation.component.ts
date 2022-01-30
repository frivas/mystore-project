import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  @Input() cart: Cart;

  constructor(private cartService: CartService) {
    this.cart = {
      products: [],
      totalPrice: 0,
      numberOfProducts: 0,
      confirmed: false
    };
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCurrentCart();
    this.cartService.resetCart();
  }
}
