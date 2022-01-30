import { Product } from './Product';

export class Cart {
  products: Product[];
  totalPrice: number;
  numberOfProducts: number;
  confirmed: boolean;
  cartOwner?: string;

  constructor() {
    this.products = [];
    this.totalPrice = 0;
    this.numberOfProducts = 0;
    this.confirmed = false;
    this.cartOwner = '';
  }
}
