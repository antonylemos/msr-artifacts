import { Component, input, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { AddToCartButtonComponent } from '../add-to-cart-button/add-to-cart-button.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [AddToCartButtonComponent, CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  product = input.required<Product>();

}
