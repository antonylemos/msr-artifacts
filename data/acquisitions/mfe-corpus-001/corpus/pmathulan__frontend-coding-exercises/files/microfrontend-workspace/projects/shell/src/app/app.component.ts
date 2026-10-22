import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'shared';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  message = '';

  constructor(private messageService: MessageService) { }

  sendMessage() {
    console.log('Sending message:', this.message);

    this.messageService.setMessage(this.message);
  }
}
