import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favorites: Product[];

  constructor() {
    this.favorites = [];
  }

  addFavorite(product: Product): void {
    const itemAlreadyExists = this.favorites.find((p) => p.id == product.id);
    if (!itemAlreadyExists) {
      this.favorites.push(product);
    }
  }

  removeFavorite(product: Product): void {
    const filtered = this.favorites.filter((p) => p.id != product.id);
    this.favorites = filtered;
  }

  getFavorites(): Product[] {
    return this.favorites;
  }
}
