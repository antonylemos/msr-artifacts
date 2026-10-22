import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../../product/models/product.model';
import { CartItem } from '../../../cart/models/cart-item.model';
import { addItemAction } from '../../../cart/store/cart.actions';

@Component({
  selector: 'app-add-to-cart-button',
  imports: [],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.scss'
})
export class AddToCartButtonComponent {
  product = input.required<Product>();

  private store = inject(Store);

  addToCart(): void {
    const item: CartItem = {
      ...this.product(),
      quantity: 1
    };
    this.store.dispatch(addItemAction({ item }));
  }
}
