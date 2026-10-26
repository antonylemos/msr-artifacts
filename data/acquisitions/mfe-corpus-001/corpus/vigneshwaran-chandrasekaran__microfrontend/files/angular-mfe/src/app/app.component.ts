// Angular MFE — Fun Facts component.
//
// Demonstrates:
//   - @Component decorator (the Angular way to define a component)
//   - Class properties as component state
//   - A method that handles a button click event (bound in the template)
import { Component } from '@angular/core';

@Component({
  selector:    'app-root',             // Matches <app-root> in index.html / mount.ts
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.css'],
})
export class AppComponent {
  facts: string[] = [
    'Angular is a full framework maintained by Google.',
    'Angular uses TypeScript by default — it provides type safety.',
    'Angular has two-way data binding with [(ngModel)].',
    'Angular Components use decorators like @Component to define metadata.',
    'Angular CLI can generate components, services, modules and more.',
    'Angular uses Dependency Injection to share services across the app.',
  ];

  factIndex   = 0;
  currentFact = this.facts[0];

  // Called when the user clicks the "Next Fact" button
  // (click) event binding is defined in the HTML template
  nextFact(): void {
    this.factIndex  = (this.factIndex + 1) % this.facts.length;
    this.currentFact = this.facts[this.factIndex];
  }
}
