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
      products: [
        {
          id: 1,
          description: '',
          name: '',
          price: 0,
          priceInCart: 0,
          quantity: 0,
          quantityInCart: 0,
          url: ''
        }
      ],
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
      product.priceInCart = product.quantityInCart * product.price;

      if (itemAlreadyExists) {
        productIndex = this.cart.products.findIndex((p) => p.id == product.id);
        this.cart.products[productIndex] = product;
        console.log('Already');
      } else {
        console.log('New');
        this.cart.products.push(product);
        productIndex = this.cart.products.length - 1;
      }

      this.cart.totalPrice = this.cart.products
        .map((p) => p.priceInCart)
        .reduce((x, y) => x + y, 0);

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

    this.cart.totalPrice = this.cart.products
      .map((p) => p.priceInCart)
      .reduce((x, y) => x + y, 0);

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
    return this.cart;
  }
}
