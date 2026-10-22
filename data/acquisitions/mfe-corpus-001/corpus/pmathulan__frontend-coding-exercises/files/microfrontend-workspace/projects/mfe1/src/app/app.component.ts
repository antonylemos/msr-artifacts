import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MessageService } from 'shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  message = '';
  private messageService = inject(MessageService);

  constructor() {
    this.messageService.message$.subscribe(msg => {
      this.message = msg;
    });
  }
}