import { Injectable, inject } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { LOCAL_STORAGE } from '../../../core/providers/local-storage';

@Injectable({ providedIn: 'root' })
export class CartStorageService {
    private readonly localStorage = inject(LOCAL_STORAGE);

    get(): CartItem[] {
        const raw = this.localStorage?.getItem('cart');
        return raw ? JSON.parse(raw) : [];
    }

    save(items: CartItem[]): void {
        console.log('Saving cart items to local storage:', items);

        this.localStorage?.setItem('cart', JSON.stringify(items));
    }
}
