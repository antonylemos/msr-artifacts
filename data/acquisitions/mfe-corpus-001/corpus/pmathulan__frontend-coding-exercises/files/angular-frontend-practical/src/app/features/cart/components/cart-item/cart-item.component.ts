import { ChangeDetectionStrategy, Component, input, OnInit, output, signal } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class CartItemComponent implements OnInit {
  item = input.required<CartItem>();
  remove = output<string>();
  quantityChange = output<{ id: string; quantity: number }>();

  // Use a signal for the quantity to manage local state reactively
  quantity = signal(0);

  ngOnInit(): void {
    // Initialize the quantity signal with the input item's quantity
    this.quantity.set(this.item().quantity);
  }

  decreaseQuantity(): void {
    this.quantity.update((q) => Math.max(1, q - 1));
    this.emitQuantityChange();
  }

  increaseQuantity(): void {
    this.quantity.update((q) => q + 1);
    this.emitQuantityChange();
  }

  private emitQuantityChange(): void {
    this.quantityChange.emit({ id: this.item().id, quantity: this.quantity() });
  }
}