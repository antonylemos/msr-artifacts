import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { addItemAction, loadFromStorageAction, loadFromStorageSuccessAction, removeItemAction, updateQuantityAction } from './cart.actions';
import { ToastrService } from 'ngx-toastr';
import { selectCartItems } from './cart.selectors';
import { CartStorageService } from '../services/cart-storage.service';
import { Store } from '@ngrx/store';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private toastr = inject(ToastrService);
  private storage = inject(CartStorageService);
  private store = inject(Store);

  // Load cart from localStorage
  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFromStorageAction),
      map(() => {
        const items = this.storage.get();
        return loadFromStorageSuccessAction({ items });
      })
    )
  );

  // Save to localStorage on any mutation
  persistCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItemAction, removeItemAction, updateQuantityAction),
      withLatestFrom(this.store.select(selectCartItems)),
      tap(([_, items]) => {
        this.storage.save(items);
      })
    ),
    { dispatch: false }
  );

  // Show toast after item added
  addItemToast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addItemAction),
      tap((product) => {
        this.toastr.success('Item added to cart', product.item.name);
      })
    ),
    { dispatch: false } // No further action dispatched
  );

  // Show toast after item removed
  removeItemToast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeItemAction),
      tap((product) => {
        this.toastr.error('Item removed from cart');
      })
    ),
    { dispatch: false }
  );

  // Show toast after quantity update
  showUpdateToast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateQuantityAction),
      tap(() => {
        this.toastr.info('Item quantity updated');
      })
    ),
    { dispatch: false }
  );

  // Example (commented) future API call
  /*
  loadCartFromApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      switchMap(() =>
        this.cartApiService.getCart().pipe(
          map(items => CartActions.loadFromStorage({ items })),
          catchError(() => of(CartActions.loadCartFailed()))
        )
      )
    )
  );
  */
}
