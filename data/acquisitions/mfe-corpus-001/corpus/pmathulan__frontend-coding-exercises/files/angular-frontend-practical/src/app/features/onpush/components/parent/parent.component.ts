import { Component, signal } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss'
})
export class ParentComponent {
  // Signals for state management
  counter = signal(0);
  inputValue = signal('');
  items = signal([
    { id: 1, value: 'A' },
    { id: 2, value: 'B' },
  ]);

  changeDetectionRuns = 0;

  constructor() {
    console.log('ParentComponent: Constructor');
  }

  increment(): void {
    this.counter.update((c) => c + 1);
  }

  updateInput(event: Event): void {
    this.inputValue.set((event.target as HTMLInputElement).value);
  }

  updateItems(): void {
    // Immutably update the items signal
    this.items.update((currentItems) =>
      currentItems.map((item) => ({ ...item, value: item.value + '!' }))
    );
  }

}
