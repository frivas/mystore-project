import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product;
  quantity: number;

  constructor(private cartService: CartService) {
    this.product = {
      id: 0,
      description: '',
      name: '',
      price: 0,
      priceInCart: 0,
      quantity: 0,
      quantityInCart: 0,
      url: ''
    };
    this.quantity = 0;
  }

  ngOnInit(): void {}

  addProductToCart(product: Product, quantity: number): void {
    this.cartService.addProductToCart(product, quantity);
  }

  onChange(quantity: number): void {
    this.quantity = quantity;
  }
}
