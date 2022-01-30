import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  constructor() {
    this.product = {
      id: 1,
      name: '',
      price: 0,
      priceInCart: 0,
      url: '',
      description: '',
      quantity: 0,
      quantityInCart: 0
    };
  }

  ngOnInit(): void {}
}
