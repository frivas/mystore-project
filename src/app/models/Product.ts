export class Product {
  id: number;
  description: string;
  favorite: boolean;
  name: string;
  price: number;
  priceInCart: number;
  quantity: number;
  quantityInCart: number;
  url: string;

  constructor() {
    this.id = 0;
    this.description = '';
    this.favorite = false;
    this.name = '';
    this.price = 0;
    this.priceInCart = 0;
    this.quantity = 0;
    this.quantityInCart = 0;
    this.url = '';
  }
}
