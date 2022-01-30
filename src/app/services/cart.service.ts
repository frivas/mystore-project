import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from './product.service';
import { Cart } from '../models/Cart';
import { UtilsService } from 'src/app/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productsList: Product[] = [];
  productsInCart: Product[] = [];
  cart: Cart;

  constructor(
    private productService: ProductService,
    private utilsService: UtilsService
  ) {
    this.cart = {
      products: [],
      totalPrice: 0,
      numberOfProducts: 0,
      confirmed: false
    };
    this.productService.getProductList().subscribe((data: Product[]) => {
      this.productsList = data;
    });
  }

  addProductToCart(product: Product, quantity: number): void {
    let productIndex = 0;

    if (quantity != 0) {
      const itemAlreadyExists = this.cart.products.find(
        (p) => p.id == product.id
      );
      product.quantityInCart =
        quantity <= product.quantity ? quantity : product.quantity;
      product.priceInCart = this.truncateDecimals(
        product.quantityInCart * product.price,
        2
      );

      if (itemAlreadyExists) {
        productIndex = this.cart.products.findIndex((p) => p.id == product.id);
        this.cart.products[productIndex] = product;
        console.log('Already');
      } else {
        console.log('New');
        this.cart.products.push(product);
        productIndex = this.cart.products.length - 1;
      }

      const temporaryPrice = this.cart.products
        .map((p) => p.priceInCart)
        .reduce((x, y) => x + y, 0);

      this.cart.totalPrice = this.truncateDecimals(temporaryPrice, 2);

      this.cart.numberOfProducts = this.cart.products
        .map((p) => p.quantityInCart)
        .reduce((x, y) => x + y, 0);

      console.log(`Cart From Service => ${JSON.stringify(this.cart, null, 2)}`);
      this.utilsService.openSnackBar(`Your cart has been modified.`);
    } else {
      this.removeProductFromCart(product, quantity);
    }
  }

  removeProductFromCart(product: Product, quantity: number): void {
    const filtered = this.cart.products.filter((p) => p.id != product.id);
    this.cart.products = filtered;

    const temporaryPrice = this.cart.products
      .map((p) => p.priceInCart)
      .reduce((x, y) => x + y, 0);
    this.cart.totalPrice = this.truncateDecimals(temporaryPrice, 2);

    this.cart.numberOfProducts = this.cart.products
      .map((p) => p.quantityInCart)
      .reduce((x, y) => x + y, 0);

    if (quantity === 0) {
      this.utilsService.openSnackBar(
        `Your product has been removed from your cart.`
      );
    } else {
      this.utilsService.openSnackBar(`Your cart has been modified.`);
    }
  }

  confirmCart(): void {
    this.cart.confirmed = true;
  }

  getNumberOfProducts(): number {
    return this.cart.numberOfProducts;
  }

  getCurrentCart(): Cart {
    if (this.cart.numberOfProducts === 0) {
      this.cart.products = [];
    }
    return this.cart;
  }

  resetCart(): void {
    this.cart = {
      products: [],
      totalPrice: 0,
      numberOfProducts: 0,
      confirmed: false
    };
  }

  truncateDecimals(number: number, digits: number): number {
    const multiplier = Math.pow(10, digits);
    const adjustedNum = number * multiplier;
    const truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
  }
}
