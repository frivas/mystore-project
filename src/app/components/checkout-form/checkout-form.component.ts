import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {
  checkoutForm: FormGroup;
  @Input() cart: Cart;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) {
    this.cart = {
      products: [],
      totalPrice: 0,
      numberOfProducts: 0,
      confirmed: false
    };
    this.checkoutForm = builder.group({
      fullname: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(32)
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]),
      ccnumber: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern('^[0-9]*$')
      ])
    });
  }

  ngOnInit(): void { }

  submitForm(): void {
    this.cart = this.cartService.getCurrentCart();
    this.cart.confirmed = true;
    this.cart.cartOwner = this.checkoutForm.value.fullname;
    this.router.navigate(['confirmation']);
  }
}
