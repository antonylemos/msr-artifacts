import { ChangeDetectionStrategy, Component, input, OnChanges, output, SimpleChanges } from '@angular/core';
import { CapitalizePipe } from "../../pipes/capitalize.pipe";

@Component({
  selector: 'app-child',
  imports: [CapitalizePipe],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnChanges {
  counter = input<number>(0);
  inputValue = input<string>('');
  items = input<{ id: number; value: string }[]>([]);
  changeDetection = output<number>();

  changeDetectionRuns = 0;

  constructor() {
    console.log('ChildComponent: Constructor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ChildComponent: ngOnChanges', changes);
    if (changes['counter'] || changes['inputValue'] || changes['items']) {
      this.changeDetectionRuns++;
      this.changeDetection.emit(this.changeDetectionRuns);
    }
  }

}