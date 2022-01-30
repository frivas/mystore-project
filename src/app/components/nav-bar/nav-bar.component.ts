import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() numberOfProducts = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  totalNumberOfProducts(): number {
    return this.cartService.getNumberOfProducts();
  }
}
