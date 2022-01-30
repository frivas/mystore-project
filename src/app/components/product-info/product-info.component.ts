import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  productList: Product[] = [];
  productDetail: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productDetail = {
      id: 0,
      description: '',
      favorite: false,
      name: '',
      price: 0,
      priceInCart: 0,
      quantity: 0,
      quantityInCart: 0,
      url: ''
    };
  }

  ngOnInit(): void {
    this.productService.getProductList().subscribe((data: Product[]) => {
      this.productList = data;
      const id = parseInt(this.route.snapshot.params['id']);
      this.productDetail = this.productList.filter((p) => p.id == id)[0];
    });
  }

  submitForm() {
    return 'ok';
  }
}
