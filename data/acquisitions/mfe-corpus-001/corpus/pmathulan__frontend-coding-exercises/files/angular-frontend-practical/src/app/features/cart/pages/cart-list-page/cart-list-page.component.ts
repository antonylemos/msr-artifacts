import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartIsLoading, selectCartItemCount, selectCartItems, selectCartTotal } from '../../store/cart.selectors';
import { FormsModule } from '@angular/forms';
import { loadFromStorageAction, removeItemAction, updateQuantityAction } from '../../store/cart.actions';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cart-list-page',
  imports: [CartItemComponent, FormsModule, CommonModule, RouterModule, CurrencyPipe],
  templateUrl: './cart-list-page.component.html',
  styleUrl: './cart-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CartListPageComponent implements OnInit {
  private store = inject(Store);

  // Use signals for reactive data
  items = toSignal(this.store.select(selectCartItems), { initialValue: [] });
  itemCount = toSignal(this.store.select(selectCartItemCount), { initialValue: 0 });
  total = toSignal(this.store.select(selectCartTotal), { initialValue: 0 });
  isLoading = toSignal(this.store.select(selectCartIsLoading), { initialValue: true });

  constructor() {
  }

  ngOnInit(): void {
    this.store.dispatch(loadFromStorageAction()); // trigger loading in effect
  }

  removeItem(itemId: string): void {
    this.store.dispatch(removeItemAction({ id: itemId }));
  }

  updateItemQuantity(event: { id: string; quantity: number }): void {
    this.store.dispatch(updateQuantityAction(event));
  }
}