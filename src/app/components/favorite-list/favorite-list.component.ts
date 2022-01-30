import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { FavoritesService } from 'src/app/services/favorites.service'

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {
  @Input() products: Product[];

  constructor(private favoritesService: FavoritesService) {
    this.products = [];
  }

  ngOnInit(): void {
    this.products = this.favoritesService.getFavorites();
  }
}
