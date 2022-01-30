import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  constructor(private favoriteService: FavoritesService) {
    this.product = {
      id: 0,
      name: '',
      price: 0,
      priceInCart: 0,
      url: '',
      description: '',
      favorite: false,
      quantity: 0,
      quantityInCart: 0
    };
  }

  ngOnInit(): void {}

  favorite(favorite: boolean) {
    this.product.favorite = favorite;
    console.log(`Favorite => ${favorite}`);
    if (favorite) {
      this.favoriteService.addFavorite(this.product);
    } else {
      this.favoriteService.removeFavorite(this.product);
    }
    console.log(
      `Favorite from Product Item => ${JSON.stringify(
        this.favoriteService.getFavorites(),
        null,
        2
      )}`
    );
  }
}
